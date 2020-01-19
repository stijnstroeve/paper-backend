import {Color} from "./color";
import {LogType} from "./log_type";
import {PaperConfig} from "../paper_config";

export class Logger {
    // Static method

    /**
     * Logs a message to the console
     * @param message The message to log
     * @param color The color of the message to log
     */
    static log(message: string, color: Color = Color.WHITE) {
        console.log('[' + this.getCurrentTime() + '] ' + color + message + Color.RESET);
    }

    /**
     * Logs a typed message to the console
     * @param type The type of the message to log
     * @param message The message to log
     */
    static logType(type: LogType, message: string) {
        console.log('[' + this.getCurrentTime() + '] ' + type + message + Color.RESET);
    }

    /**
     * Gets the current time in locale time string
     * @returns The current time
     */
    static getCurrentTime() {
        let date = new Date();
        return date.toLocaleTimeString();
    }

    // Class methods
    private config: PaperConfig;

    constructor(config: PaperConfig) {
        this.config = config;
    }

    public log(message: string, color: Color = Color.WHITE) {
        if(!this.config.suppressMessages) Logger.log(message, color);
    }

    public logType(type: LogType, message: string) {
        if(type == LogType.WARNING) {
            if(!this.config.suppressWarnings) Logger.logType(type, message);
        } else {
            if(!this.config.suppressMessages) Logger.logType(type, message);
        }
    }
}
