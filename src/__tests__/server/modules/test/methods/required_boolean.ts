import {ModuleMethod} from "../../../../../module/module_method";
import {IParameter} from "../../../../../requests/parameter";
import {RequestType} from "../../../../../requests/request_type";
import {DataType} from "../../../../../data_types/data_type";
import {ModuleRequest} from "../../../../../requests/module_request";

export class RequiredBooleanMethod extends ModuleMethod {
    optionalParameters: IParameter[] = [];
    request: string = "required-boolean";
    requestType: RequestType = RequestType.GET;
    requiredParameters: IParameter[] = [{name: "required-boolean", type: DataType.BOOLEAN}];

    handle(request: ModuleRequest): void {
        request.respond({test: "success"});
    }

}