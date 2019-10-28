import {Color} from "./color";
import {LogType} from "./log_type";
import PaperConfig from "../paper_config";

export default class Logger {
    static log(message: string, color: Color = Color.WHITE) {
        console.log('[' + this.getCurrentTime() + '] ' + color + message + Color.RESET);
    }
    static logType(type: LogType, message: string) {
        console.log('[' + this.getCurrentTime() + '] ' + type + message + Color.RESET);
    }
    static getCurrentTime() {
        let date = new Date();
        return date.toLocaleTimeString();
    }

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
