import { Container } from "inversify";
import { ILogger } from "./infrastructure/loggers";
import { ConsoleLogger, FileLogger } from "./infrastructure/loggers";

// Create DI Container
const container = new Container();

// Register dependencies
container.bind<ILogger>("ILogger").to(ConsoleLogger); // Change to FileLogger if needed
//container.bind<ILogger>("ILogger").to(FileLogger); // Uncomment this to switch

export { container };
