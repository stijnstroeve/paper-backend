import {Middleware} from "./middleware";
import {RequestHandlerParams} from "express-serve-static-core";
import {compose} from "compose-middleware";
import {Module} from "../module/module";
import {ModuleMethod} from "../module/module_method";
import {ModuleRequestMiddleware} from "./middleware/module_request";
import {ParameterMiddleware} from "./middleware/parameter_middleware";
import {ModuleRequest} from "../requests/module_request";

export class MiddlewareHandler {
    middleware: Middleware[];

    constructor() {
        // Add the default middleware
        this.middleware = [
            new ModuleRequestMiddleware(),
            new ParameterMiddleware()
        ];
    }

    /**
     * Add a middleware to the list
     * @param middleware The middleware to add
     */
    public addMiddleware(middleware: Middleware) {
        this.middleware.push(middleware);
    }

    /**
     * Turns all middleware into 1 usable middleware
     * @param module The module to handle
     * @param method The method to handle
     * @param request The request to handle
     */
    getMiddleware(module: Module, method: ModuleMethod, request: ModuleRequest): RequestHandlerParams {
        const handlerList: RequestHandlerParams[] = [];
        this.middleware.forEach((item) => {
            handlerList.push(item.handle(module, method, request));
        });
        return compose(handlerList);
    }
}
