import { inject, injectable } from "inversify";
import axios from "axios";
import { IConfiguration } from "../../infrastructure/configuration";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface IGetWeatherHttpClientResponse
{
    feelLike: number,
    temp: number,
    humidity: number,
    wind: number
}

export interface IGetWeatherHttpClient {
    getWeatherAsync(city: string): Promise<IGetWeatherHttpClientResponse>;
}

@injectable()
export class GetWeatherHttpClient implements IGetWeatherHttpClient {
    constructor(@inject("IConfiguration") private readonly _configuration: IConfiguration )
{}
    
    public async getWeatherAsync(city: string): Promise<IGetWeatherHttpClientResponse> {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: this._configuration.OpenWeatherApiKey,
                units: "metric"
            },
        });

        return { 
            feelLike: response.data.main.feels_like,
            temp: response.data.main.feels_like,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed
        };
    }
}
