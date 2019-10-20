import {ModuleHandler} from "./module/module_handler";
import {MiddlewareHandler} from "./middleware/middleware_handler";
import {Router} from "./router/router";
import {Module} from "./module/module";

export class Paper {
    modules: ModuleHandler;
    middleware: MiddlewareHandler;
    router: Router;
    constructor() {
        this.modules = new ModuleHandler();
        this.middleware = new MiddlewareHandler();
        this.router = new Router();
    }
    registerModule(module: Module) {
        this.modules.register(module);
    }
    getRoutes() {
        return this.router.registerRoutes(this.middleware, this.modules);
    }

}