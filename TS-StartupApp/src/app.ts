import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ILogger } from "./infrastructure/loggers";
import { container } from "./dependency-injection";

@injectable()
class App {
  private logger: ILogger;

  constructor(@inject("ILogger") logger: ILogger) {
    this.logger = logger;
  }

  run() {
    this.logger.log("Dependency Injection with Inversify works!");
  }
}

// Resolve App from container
const app = container.resolve(App);
app.run();
