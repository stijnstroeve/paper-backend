import {Request, Response} from "express";
import ModuleMethod from "../module/module_method";
import DefaultResponse from "./default_response";
import Error from "../error/error";

export default class ModuleRequest {
    request?: Request;
    response?: Response;
    private readonly _method: ModuleMethod;
    private _parameters?: any;

    constructor(method: ModuleMethod) {
        this._method = method;
    }

    respond(data: any) {
        let response = new DefaultResponse(this, true, data).json();

        if(this.response) {
            this.response.send(response);
        }
    }

    error(error: Error, status?: number) {
        let response = new DefaultResponse(this, false, null, error).json();

        if(this.response) {
            if (status) {
                this.response.status(status).send(response);
            } else {
                this.response.send(response);
            }
        }
    }

    get method(): ModuleMethod {
        return this._method;
    }

    get parameters(): any {
        return this._parameters;
    }

    set parameters(value: any) {
        this._parameters = value;
    }

}
