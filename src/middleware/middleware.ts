import {RequestHandlerParams} from "express-serve-static-core";
import {Module} from "../module/module";
import {ModuleMethod} from "../module/module_method";
import {ModuleRequest} from "../requests/module_request";

export abstract class Middleware {
    abstract handle(module: Module, method: ModuleMethod, request: ModuleRequest): RequestHandlerParams;
}
