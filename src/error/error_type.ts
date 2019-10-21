
export class ErrorType {
    public static unknown = new ErrorType("UNKNOWN", -1, "An unknown error occurred.");
    public static not_enough_parameters = new ErrorType("NOT_ENOUGH_PARAMETERS", -2, "Not enough parameters were given.");
    public static unknown_parameter = new ErrorType("UNKNOWN_PARAMETER", -3, "Unknown parameter '[PARAMETER]'.");
    public static multiple_parameters = new ErrorType("MULTIPLE_PARAMETERS", -4, "Multiple parameters found with name '[PARAMETER]'.");
    public static data_parse = new ErrorType("DATA_PARSE", -5, "An error occurred while parsing parameter '[PARAMETER]' of data type '[DATATYPE]'.");

    static types: ErrorType[] = [];
    static registerType(key: string | ErrorType, code?: number, description?: string): void {
        if(key instanceof ErrorType) {
            this.types.push(key);
        } else if(code && description) {
            this.types.push(new ErrorType(key, code, description));
        }
    }
    static get(key: string): ErrorType {
        for(let i = 0; i < this.types.length; i++) {
            const type = this.types[i];
            if(type.key == key) return type;
        }
        return this.unknown;
    }
    key: string;
    code: number;
    description: string;

    constructor(key: string, code: number, description: string) {
        this.key = key;
        this.code = code;
        this.description = description;
    }
}
