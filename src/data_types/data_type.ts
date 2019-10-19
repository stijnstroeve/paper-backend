
export class DataType {
    public source: any;
    public data: any;
    constructor(source: any) {
        this.source = source;
    }
    valid(): boolean {
        if(this.source) {
            this.data = this.source;
            return true;
        }
        return false;
    }
}
