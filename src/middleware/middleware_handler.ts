import {Middleware} from "./middleware";
import {RequestHandlerParams} from "express-serve-static-core";
import {compose} from "compose-middleware";
import {Module} from "../module/module";
import {ModuleMethod} from "../module/module_method";

export class MiddlewareHandler {
    static middleware: Middleware[] = [];

    static registerMiddleware(newMiddleware: Middleware) {
        this.middleware.push(newMiddleware);
    }

    static getMiddleware(module: Module, method: ModuleMethod): RequestHandlerParams {
        const handlerList: RequestHandlerParams[] = [];
        this.middleware.forEach((item) => {
            handlerList.push(item.handle(module, method));
        });
        return compose(handlerList);
    }
}
