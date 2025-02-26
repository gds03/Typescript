import { injectable, inject } from "inversify";
import { IGetWeatherHttpClient } from "./get-weather-httpclient";
import { GetWeatherDbEntry, IGetWeatherDb } from "./get-weather-db";
import { error } from "console";

export interface GetWeatherHandlerRequest {
  username: string,
  city: string,
  cacheSeconds: number,
}


export interface IGetWeatherHandler {
  getWeatherAsync(request: GetWeatherHandlerRequest): Promise<string>;
}

@injectable()
export class GetWeatherHandler implements IGetWeatherHandler {

  constructor(
    @inject("IGetWeatherHttpClient") private readonly _weatherHttpClient: IGetWeatherHttpClient,
    @inject("IGetWeatherDb") private readonly _weatherDb: IGetWeatherDb
  ) { }

  /*
    Get weather for a user, caches response for a given time (in seconds) and returns weather for the city.
  */
  entryNeedsRefresh(updatedAt: Date, cacheSeconds: number): boolean {
    const elapsedSeconds = (new Date().getTime() - updatedAt.getTime()) / 1000;
    return elapsedSeconds > cacheSeconds;
  }
  async getWeatherAsync(request: GetWeatherHandlerRequest): Promise<string> {
    if (!request) {
      throw error('request missing');
    }

    let dbEntry: GetWeatherDbEntry | null;
    dbEntry = await this._weatherDb.getUsernameDataAsync(request.username);

    if (!dbEntry || this.entryNeedsRefresh(new Date(dbEntry.updatedAt), request.cacheSeconds)) {
      const apiResponse = await this._weatherHttpClient.getWeatherAsync(request.city);
      dbEntry = {
        username: request.username,
        updatedAt: new Date().toISOString(),

        feelLike: apiResponse.feelLike,
        temp: apiResponse.temp,
        humidity: apiResponse.humidity,
        wind: apiResponse.wind
      };

      await this._weatherDb.saveUsernameDataAsync(dbEntry);
      console.log(`Weather for ${request.username} was updated and saved in the cache for ${request.cacheSeconds} seconds`);
    }

    else {
      console.log(`Weather for ${request.username} was restored from the cache`);
    }

    return `Weather in ${request.city}: 
      Feel like ${dbEntry.feelLike}ºC
      Temperature ${dbEntry.temp}ºC
      Humidity ${dbEntry.humidity} %
      Wind ${dbEntry.wind} meter/sec
  `;
  }
}


