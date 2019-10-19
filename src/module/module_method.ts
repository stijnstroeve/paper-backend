
import {RequestType} from "../requests/request_type";
import {ModuleRequest} from "./ModuleRequest";

export abstract class ModuleMethod {

    abstract request: string;
    abstract requestType: RequestType;
    abstract needsAuth: boolean; //Gives access to the request.User object.
    requiredParameters!: string[];
    needsOneOfParamters!: string[][];

    abstract handle(request: ModuleRequest): void;

}
