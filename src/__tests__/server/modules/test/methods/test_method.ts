import {ModuleMethod} from "../../../../../module/module_method";
import {IParameter} from "../../../../../requests/parameter";
import {RequestType} from "../../../../../requests/request_type";
import {DataType} from "../../../../../data_types/data_type";
import {ModuleRequest} from "../../../../../requests/module_request";

export class TestMethod extends ModuleMethod {
    optionalParameters: IParameter[] = [{name: "optional", type: DataType.BOOLEAN}];
    request: string = "test-method";
    requestType: RequestType = RequestType.GET;
    requiredParameters: IParameter[] = [{name: "required-parameter", type: DataType.STRING}];

    handle(request: ModuleRequest): void {
        request.respond({test: "success"});
    }

}