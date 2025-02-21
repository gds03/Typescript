import { Container } from "inversify";
import { IGetWeatherHandler, GetWeatherHandler } from "./features/getweather/get-weather-handler";
import { IGetWeatherHttpClient, GetWeatherHttpClient } from "./features/getweather/get-weather-httpclient";

// Create DI Container
const container = new Container();

container.bind<IGetWeatherHandler>("IGetWeatherHandler").to(GetWeatherHandler);
container.bind<IGetWeatherHttpClient>("IGetWeatherHttpClient").to(GetWeatherHttpClient);

export { container };
