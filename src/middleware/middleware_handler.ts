import Middleware from "./middleware";
import {RequestHandlerParams} from "express-serve-static-core";
import {compose} from "compose-middleware";
import Module from "../module/module";
import ModuleMethod from "../module/module_method";
import ModuleRequestMiddleware from "./middleware/module_request";
import ParameterMiddleware from "./middleware/parameter_middleware";
import ModuleRequest from "../requests/module_request";

export default class MiddlewareHandler {
    middleware: Middleware[];
    constructor() {
        this.middleware = [new ModuleRequestMiddleware(), new ParameterMiddleware()];
    }
    registerMiddleware(newMiddleware: Middleware) {
        this.middleware.push(newMiddleware);
    }
    getMiddleware(module: Module, method: ModuleMethod, request: ModuleRequest): RequestHandlerParams {
        const handlerList: RequestHandlerParams[] = [];
        this.middleware.forEach((item) => {
            handlerList.push(item.handle(module, method, request));
        });
        return compose(handlerList);
    }
}
