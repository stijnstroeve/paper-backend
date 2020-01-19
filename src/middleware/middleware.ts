import {RequestHandlerParams} from "express-serve-static-core";
import {Module} from "../module/module";
import {ModuleMethod} from "../module/module_method";
import {ModuleRequest} from "../requests/module_request";

export abstract class Middleware {
    /**
     * Handles the middleware
     * @param module The module of the request
     * @param method The method of the request
     * @param request The module request
     */
    abstract handle(module: Module, method: ModuleMethod, request: ModuleRequest): RequestHandlerParams;
}
