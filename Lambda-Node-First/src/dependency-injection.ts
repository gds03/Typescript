import { Container } from "inversify";
import { IGetWeatherHandler, GetWeatherHandler } from "./features/getweather/get-weather-handler";
import { IGetWeatherHttpClient, GetWeatherHttpClient } from "./features/getweather/get-weather-httpclient";
import { Configuration, IConfiguration } from "./infrastructure/configuration";

// Create DI Container
const container = new Container();

// infrastructure
container.bind<IConfiguration>("IConfiguration").to(Configuration).inSingletonScope();

// features
container.bind<IGetWeatherHandler>("IGetWeatherHandler").to(GetWeatherHandler).inTransientScope();
container.bind<IGetWeatherHttpClient>("IGetWeatherHttpClient").to(GetWeatherHttpClient).inTransientScope();


export { container };
