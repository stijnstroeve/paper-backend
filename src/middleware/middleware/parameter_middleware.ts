import {Middleware} from "../Middleware";
import {Request, Response} from "express";
import {RequestHandlerParams} from "express-serve-static-core";
import {Error} from "../../Error/Error";
import { Utils } from "../../Utils/Utils";
import {ModuleMethod} from "../../module/module_method";
import {Module} from "../../module/module";
import {ModuleRequest} from "../../requests/module_request";
import {RequestType} from "../../requests/request_type";
import {ErrorType} from "../../error/error_type";
import {IParameter} from "../../requests/parameter";
import {ParameterType} from "../../data_types/data_type";

export class ParameterMiddleware extends Middleware {
    handle(module: Module, method: ModuleMethod): RequestHandlerParams {
        return (req: Request, res: Response, next: Function) => {
            //Set the parameters of the request.
            let request: ModuleRequest = req.moduleRequest;
            request.parameters = method.requestType == RequestType.GET ? req.query : req.body;

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
                        request.error(new Error(ErrorType.data_parse, undefined, undefined), 417);
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