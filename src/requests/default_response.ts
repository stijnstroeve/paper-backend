import {Error} from "../error/error";
import {ModuleRequest} from "./module_request";

export class DefaultResponse {
    request: ModuleRequest;
    success: boolean;
    data: any;
    error?: Error;

    constructor(request: ModuleRequest, success: boolean, data: any, error?: Error) {
        this.request = request;
        this.success = success;
        this.data = data;
        this.error = error;
    }

    /**
     * Converts the current default response into a full response
     * @returns The full response that can be sent to the client
     */
    public toObject() {
        //TODO: Stop error from sending to the client
        return {
            success: this.success,
            data: this.data || undefined,
            error: this.error ? this.error.toObject() : undefined
        };
    }
}
