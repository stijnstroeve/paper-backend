import {DataType} from "./data_type";

export class PaperString extends DataType {
    constructor(source: any) {
        super(source);
    }
    parse(): any {
        if(String(this.source)) {
            return this.source;
        }
        return null;
    }
}
