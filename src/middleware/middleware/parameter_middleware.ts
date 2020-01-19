import {Middleware} from "../middleware";
import {Request, Response} from "express";
import {RequestHandlerParams} from "express-serve-static-core";
import {Error} from "../../error/error";
import {Utils} from "../../utils/utils";
import {ModuleMethod} from "../../module/module_method";
import {Module} from "../../module/module";
import {ModuleRequest} from "../../requests/module_request";
import {RequestType} from "../../requests/request_type";
import {ErrorType} from "../../error/error_type";
import {IParameter} from "../../requests/parameter";
import {DataType, ParameterType} from "../../data_types/data_type";

export class ParameterMiddleware extends Middleware {

    /**
     * Checks the parameters of the given module request
     * @param request
     */
    checkParameters(request: ModuleRequest): boolean {
        const keys = Object.keys(request.parameters);
        keys.forEach((key) => {
            //First check if the parameter is only gives once.
            if(Array.isArray(request.parameters[key])) {
                //There are multiple parameters with this name.
                request.error(new Error(ErrorType.multiple_parameters, undefined, [{name: "PARAMETER", variable: key}]), 417);
                return false;
            }

            //Check if the given parameter is in the required parameters or optional parameters.
            const requiredParameter = request.method.requiredParameters.find((item: IParameter) => {if(item.name == key) return item});
            const optionalParameter = request.method.optionalParameters.find((item: IParameter) => {if(item.name == key) return item});
            if(!requiredParameter && !optionalParameter) {
                //If the given parameter is not in required or optional, give an error.
                request.error(new Error(ErrorType.unknown_parameter, undefined, [{name: "PARAMETER", variable: key}]), 417);
                return false;
            }
        });
        return true;
    }

    /**
     * Checks if all parameters are the right parameters in the current request
     */
    handle(module: Module, method: ModuleMethod, request: ModuleRequest): RequestHandlerParams {
        return (req: Request, res: Response, next: Function) => {
            //Set the parameters of the request.
            request.parameters = method.requestType == RequestType.GET ? req.query : req.body;

            if(this.checkParameters(request)) {
                let goNext = true;
                if(!method.requiredParameters) {next(); return}

                //Create a clone so the original "requiredParameters" wont be changed.
                let missing = Utils.fastClone(method.requiredParameters);

                //Check if all required parameters were given.
                for(let i = 0; i < method.requiredParameters.length; i++) {
                    let required = method.requiredParameters[i];

                    // @ts-ignore
                    if(!(required.name in request.parameters)) {
                        goNext = false;
                    } else {
                        // @ts-ignore
                        if(request.parameters[required.name].trim() == "") {
                            goNext = false;
                            continue;
                        }
                        if(!ParameterType.parse(request.parameters[required.name], required.type)) {
                            request.error(new Error(ErrorType.data_parse, undefined, [{name: "PARAMETER", variable: required.name}, {name: "DATATYPE", variable: DataType[required.type]}]), 417);
                            return;
                        }
                        let index = missing.indexOf(required);
                        missing.splice(index, 1);
                    }
                }

                if(!goNext) {
                    const missingNames: string[] = [];
                    missing.forEach((item: IParameter) => {
                        missingNames.push(item.name);
                    });

                    request.error(new Error(ErrorType.not_enough_parameters, undefined, undefined, {name: "missing", extra: missingNames}), 417);
                    return;
                }

                next();
            }
        }
    }
}
