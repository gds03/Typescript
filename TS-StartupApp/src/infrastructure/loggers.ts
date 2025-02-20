import { injectable } from "inversify";

export interface ILogger {
  log(message: string): void;
}

@injectable()
export class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`[ConsoleLogger]: ${message}`);
  }
}

@injectable()
export class FileLogger implements ILogger {
  log(message: string): void {
    console.log(`[FileLogger]: Simulating file write: ${message}`);
  }
}
