import { Container } from "inversify";

import { Configuration, IConfiguration } from "./infrastructure/configuration";
import { ILogger, ConsoleLogger } from "./infrastructure/logger";

import { IGetWeatherHandler, GetWeatherHandler } from "./features/getweather/get-weather-handler";
import { IGetWeatherHttpClient, GetWeatherHttpClient } from "./features/getweather/get-weather-httpclient";
import { IGetWeatherDb, GetWeatherDb } from "./features/getweather/get-weather-db";


// Create DI Container
const container = new Container();

// infrastructure
container.bind<IConfiguration>("IConfiguration").to(Configuration).inSingletonScope();
container.bind<ILogger>("ILogger").to(ConsoleLogger).inSingletonScope();

// features
container.bind<IGetWeatherHandler>("IGetWeatherHandler").to(GetWeatherHandler).inTransientScope();
container.bind<IGetWeatherHttpClient>("IGetWeatherHttpClient").to(GetWeatherHttpClient).inTransientScope();
container.bind<IGetWeatherDb>("IGetWeatherDb").to(GetWeatherDb).inTransientScope();


export { container };
