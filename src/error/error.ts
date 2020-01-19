import {ErrorType} from "./error_type";

export class Error {
    reference: string;
    type: ErrorType;
    error: any;
    variables?: {name: string, variable: string}[];
    extra?: {name: string, extra: any};

    constructor(type: ErrorType, error?: any, variables?: {name: string, variable: string}[], extra?: {name: string, extra: any}) {
        this.reference = randomReference(24, 1);
        this.type = type;
        this.error = error ? error : type.description;
        this.variables = variables;
        this.extra = extra;
    }

    /**
     * Parses the error's description
     * @returns The parse ddescription
     */
    parseDescription() {
        let parsed = this.type.description;
        if(this.variables) {
            for(let i = 0; i < this.variables.length; i++) {
                let variable = this.variables[i];
                parsed = parsed.replace("[" + variable.name + "]", variable.variable);
            }
        }
        return parsed;
    }

    /**
     * Converts the current error into a usable object for the client
     * @returns An error object that can be sent to the client
     */
    toObject() {
        let object = {
            key: this.type.key,
            refCode: this.type.code,
            reference: this.reference,
            description: this.parseDescription()
        };

        // Adds the extra variable to the error
        if(this.extra) {
            Object.assign(object, {[this.extra.name]: this.extra.extra});
        }

        return object;
    }
}

/**
 * @returns a random string of characters
 * @param lengthPerPart Length of each part
 * @param amountOfParts The amount of parts
 * @param partSeperator The character that seperates all parts
 */
const randomReference = (lengthPerPart: number, amountOfParts: number, partSeperator: string = "-"): string => {
    let toChoose: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    let id: string = "";

    for(let i = 0; i < amountOfParts; i++) {
        for(let x = 0; x < lengthPerPart; x++) {
            let random: number = Math.floor(Math.random() * toChoose.length);
            let randomChar: string = toChoose.charAt(random);
            id += randomChar;
        }
        if(i !== amountOfParts-1) {
            id += partSeperator; //Add a dash in the middle of all parts
        }
    }
    return id;
};
