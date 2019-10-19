
export class ErrorType {
    private static unknown = new ErrorType('UNKNOWN', -1, "An unknown error occurred.");

    static types: ErrorType[] = [];
    static registerType(key: string | ErrorType, code?: number, description?: string): void {
        if(key instanceof ErrorType) {
            this.types.push(key);
        } else if(code && description) {
            this.types.push(new ErrorType(key, code, description));
        }
    }
    static get(key: string): ErrorType | null {
        this.types.forEach((type) => {
           if(type.key == key) {
               return key;
           }
        });
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
