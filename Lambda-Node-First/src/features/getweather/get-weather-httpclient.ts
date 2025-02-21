import { inject, injectable } from "inversify";
import axios from "axios";
import { IConfiguration } from "../../infrastructure/configuration";

// OpenWeatherMap API URL and key (replace with your actual API key)
const API_KEY = "229ad6e466f8934e10e9792e73f6992c";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface IGetWeatherHttpClient {
    getWeather(city: string): Promise<string>;
}

@injectable()
export class GetWeatherHttpClient implements IGetWeatherHttpClient {
    constructor(@inject("IConfiguration") private readonly _configuration: IConfiguration )
{}
    
    async getWeather(city: string): Promise<string> {
        try {
            // Make a GET request to the weather API
            const response = await axios.get(BASE_URL, {
                params: {
                    q: city,
                    appid: this._configuration.OpenWeatherApiKey,
                    units: "metric"
                },
            });

            // Extract relevant data from the response
            const weatherDescription = response.data.weather[0].description;
            const temperature = response.data.main.temp;

            return `The weather in ${city} is currently ${weatherDescription} with a temperature of ${temperature}°C.`;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return `Sorry, we couldn't fetch the weather data for ${city}.`;
        }
    }
}
