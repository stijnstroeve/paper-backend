import Middleware from "../middleware";
import {Request, Response} from "express";
import {RequestHandlerParams} from "express-serve-static-core";
import Module from "../../module/module";
import ModuleMethod from "../../module/module_method";
import ModuleRequest from "../../requests/module_request";

export default class ModuleRequestMiddleware extends Middleware {
    handle(module: Module, method: ModuleMethod, request: ModuleRequest): RequestHandlerParams {
        return (req: Request, res: Response, next: Function) => {
            request.request = req;
            request.response = res;
            next();
        }
    }
}
