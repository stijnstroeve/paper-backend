
export class ParameterType {
    static parse(source: any, type: DataType): boolean {
        switch (type) {
            case DataType.NUMBER:
                return !Number.isNaN(Number(source));
            case DataType.STRING:
                return String(source) != undefined;
            case DataType.BOOLEAN:
                if(Number(source) >= 1) {
                    return true;
                } else if(Number(source) == 0) {
                    return true;
                } else if(Boolean(source)) {
                    return true;
                }
                return false;
        }
        return false;
    }
}

export enum DataType {
    NUMBER,
    STRING,
    BOOLEAN
}