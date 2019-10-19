
import {Request, Response} from "express";
import {ModuleMethod} from "../module/module_method";
import {DefaultResponse} from "./default_response";

export class ModuleRequest {
    private readonly _request: Request;
    private readonly _response: Response;
    private readonly _method: ModuleMethod;
    private _parameters?: any;

    constructor(request: Request, response: Response, method: ModuleMethod) {
        this._request = request;
        this._response = response;
        this._method = method;
    }

    respond(data: any) {
        let response = new DefaultResponse(this, true, data).json();

        this._response.send(response);
    }

    error(error: Error, status?: number) {
        let response = new DefaultResponse(this, false, null, error).json();

        if(status) {
            this._response.status(status).send(response);
        } else {
            this._response.send(response);
        }
    }

    get request(): Request {
        return this._request;
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
