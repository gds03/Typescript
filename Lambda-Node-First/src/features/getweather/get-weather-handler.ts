import { injectable, inject } from "inversify";
import { IGetWeatherHttpClient } from "./get-weather-httpclient";

export interface IGetWeatherHandler {
  getWeather(city: string): Promise<string>;
}

@injectable()
export class GetWeatherHandler implements IGetWeatherHandler {
  constructor(
    @inject("IGetWeatherHttpClient") private readonly _weatherHttpClient: IGetWeatherHttpClient
  ) {}

  async getWeather(city: string): Promise<string> {
    return this._weatherHttpClient.getWeather(city);
  }
}