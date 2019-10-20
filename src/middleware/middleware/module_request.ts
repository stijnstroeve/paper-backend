import {Middleware} from "../Middleware";
import {Request, Response} from "express";
import {RequestHandlerParams} from "express-serve-static-core";
import {Module} from "../../module/module";
import {ModuleMethod} from "../../module/module_method";
import {ModuleRequest} from "../../requests/module_request";

export class ModuleRequestMiddleware extends Middleware {
    handle(module: Module, method: ModuleMethod): RequestHandlerParams {
        return (req: Request, res: Response, next: Function) => {
            const request: ModuleRequest = new ModuleRequest(req, res, method);

            req.module = module;
            req.moduleRequest = request;
            next();
        }
    }
}