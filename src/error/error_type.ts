
export class ErrorType {
    // Errors that are used by the wrapper
    public static unknown = new ErrorType("UNKNOWN", -1, "An unknown error occurred.");
    public static not_enough_parameters = new ErrorType("NOT_ENOUGH_PARAMETERS", -2, "Not enough parameters were given.");
    public static unknown_parameter = new ErrorType("UNKNOWN_PARAMETER", -3, "Unknown parameter '[PARAMETER]'.");
    public static multiple_parameters = new ErrorType("MULTIPLE_PARAMETERS", -4, "Multiple parameters found with name '[PARAMETER]'.");
    public static data_parse = new ErrorType("DATA_PARSE", -5, "An error occurred while parsing parameter '[PARAMETER]' of data type '[DATATYPE]'.");

    static types: ErrorType[] = [];

    /**
     * Registers an error type
     * @param key The key of the error type
     * @param code The code of the error type
     * @param description The description of the error type
     */
    static registerType(key: string | ErrorType, code?: number, description?: string): void {
        if(key instanceof ErrorType) {
            this.types.push(key);
        } else if(code && description) {
            this.types.push(new ErrorType(key, code, description));
        }
    }

    /**
     * Gets an error type by the given key
     * @param key The key to get the error type by
     */
    static get(key: string): ErrorType {
        return this.types.find((type: ErrorType) => type.key == key) || this.unknown;
    }

    // ErrorType instantiable class
    key: string;
    code: number;
    description: string;

    constructor(key: string, code: number, description: string) {
        this.key = key;
        this.code = code;
        this.description = description;
    }
}
