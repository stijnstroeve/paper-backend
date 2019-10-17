import {Color} from "./Color";
import {LogType} from "./log_type";

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

}