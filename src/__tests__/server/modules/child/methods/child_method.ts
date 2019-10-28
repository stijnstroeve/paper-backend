import {ModuleMethod} from "../../../../../module/module_method";
import {IParameter} from "../../../../../requests/parameter";
import {RequestType} from "../../../../../requests/request_type";
import {ModuleRequest} from "../../../../../requests/module_request";

export class ChildMethod extends ModuleMethod {
    optionalParameters: IParameter[] = [];
    request: string = "child-method";
    requestType: RequestType = RequestType.GET;
    requiredParameters: IParameter[] = [];

    handle(request: ModuleRequest): void {
        request.respond({test: "success"});
    }

}