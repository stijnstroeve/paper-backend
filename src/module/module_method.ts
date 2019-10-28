
import {RequestType} from "../requests/request_type";
import {ModuleRequest} from "../requests/module_request";
import {IParameter} from "../requests/parameter";

export abstract class ModuleMethod {

    abstract request: string;
    abstract requestType: RequestType;
    abstract requiredParameters: IParameter[];
    abstract optionalParameters: IParameter[];

    abstract handle(request: ModuleRequest): void;

}
