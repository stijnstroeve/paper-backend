import {DataType} from "./data_type";

/**
 * "True" = True
 * "False" = False
 * False = False
 * True = True
 * 1 = True
 * 0 = False
 * > 1 = True
 */

export class PaperBoolean extends DataType {
    constructor(source: any) {
        super(source);
    }
    parse(): any {
        if(Number(this.source) > 1) {
            return this.source;
        } else if(Number(this.source) == 0) {
            return this.source;
        }
        if(String(this.source)) {
            return this.source;
        }
        return null;
    }
}
