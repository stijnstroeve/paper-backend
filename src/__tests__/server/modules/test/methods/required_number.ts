import {ModuleMethod} from "../../../../../module/module_method";
import {IParameter} from "../../../../../requests/parameter";
import {RequestType} from "../../../../../requests/request_type";
import {DataType} from "../../../../../data_types/data_type";
import {ModuleRequest} from "../../../../../requests/module_request";

export class RequiredNumberMethod extends ModuleMethod {
    optionalParameters: IParameter[] = [];
    request: string = "required-number";
    requestType: RequestType = RequestType.GET;
    requiredParameters: IParameter[] = [{name: "required-number", type: DataType.NUMBER}];

    handle(request: ModuleRequest): void {
        request.respond({test: "success"});
    }

}