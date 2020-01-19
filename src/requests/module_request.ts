import {Request, Response} from "express";
import {ModuleMethod} from "../module/module_method";
import {DefaultResponse} from "./default_response";
import {Error} from "../error/error";

export class ModuleRequest {

    request?: Request;
    response?: Response;
    parameters?: any;
    readonly method: ModuleMethod;

    constructor(method: ModuleMethod) {
        this.method = method;
    }

    /**
     * Sends the given response to the client
     * @param response The response to send to the client
     * @param status The http response status
     */
    private sendResponse(response: any, status?: number) {
        if(this.response) {
            // Check if the response should be send with a different status
            if (status) {
                // Send the response with the given status
                this.response.status(status).send(response);
            } else {
                // Send the response without the given status
                this.response.send(response);
            }
        }
    }

    /**
     * Sends the given data to the client
     * @param data The data to send to the client
     * @param status The http response status
     */
    public respond(data: any, status?: number) {
        const response = new DefaultResponse(this, true, data).toObject();

        this.sendResponse(response, status);
    }

    /**
     * Sends the given error to the client
     * @param error The error to send
     * @param status The http response status
     */
    public error(error: Error, status?: number) {
        const response = new DefaultResponse(this, false, null, error).toObject();

        this.sendResponse(response, status);
    }

}
