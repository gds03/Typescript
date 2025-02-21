import { injectable, inject } from "inversify";

export interface ILogger {
    log(message: string): void;                   // For general logging
    info(message: string): void;                  // For informational messages
    warn(message: string): void;                  // For warning messages
    error(message: string): void;                 // For error messages
}

export class ConsoleLogger implements ILogger {
    log(message: string): void {
        console.log(`[LOG] ${message}`);
    }

    info(message: string): void {
        console.info(`[INFO] ${message}`);
    }

    warn(message: string): void {
        console.warn(`[WARN] ${message}`);
    }

    error(message: string): void {
        console.error(`[ERROR] ${message}`);
    }
}
