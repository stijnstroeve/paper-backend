import express from "express";
import {RequestType} from "../requests/request_type";
import {MiddlewareHandler} from "../middleware/middleware_handler";
import {ModuleHandler} from "../module/module_handler";
import {ModuleRequest} from "../requests/module_request";
import {Module} from "../module/module";

export class Router {
    router = express.Router();

    /**
     * Gets the full path of the given module
     * @param module The module to get the path of
     * @param moduleHandler The module handler
     * @returns The full path of the module
     */
    static getFullPath(module: Module, moduleHandler: ModuleHandler): string {
        let path: string = "/";
        let modules = [];

        // Get all modules that are parents of the given module
        let currentModule: Module | null = module;
        while(currentModule && !!currentModule.parentModule) {
            let newModule = moduleHandler.findModule(currentModule.parentModule);
            if(newModule) {
                modules.push(newModule);
                currentModule = newModule;
            } else {
                throw new Error(`Module '${currentModule.parentModule}' not found!`);
            }
        }

        // Reverse the modules and create a path of the array
        modules = modules.reverse();
        modules.forEach((module) => {
            path += module.name + "/";
        });

        // Add the name of the module itself to the path
        path += module.name + "/";

        return path;
    }

    /**
     * Registers the routes of the given module handler using the given middleware of the middleware handler
     * @param middlewareHandler The middleware handler containing all middleware used for this route
     * @param moduleHandler The module handler
     * @returns A router with the registered endpoint routes
     */
    registerRoutes(middlewareHandler: MiddlewareHandler, moduleHandler: ModuleHandler): express.Router {
        // Loop over every module in the module handler
        for(let i = 0; i < moduleHandler.modules.length; i++) {
            let module = moduleHandler.modules[i];

            // Loop over every method in the module
            for(let x = 0; x < module.moduleMethods.length; x++) {
                let method =  module.moduleMethods[x];
                let prefix = Router.getFullPath(module, moduleHandler) + method.request;
                const request: ModuleRequest = new ModuleRequest(method);

                // Check what request type the request has and register an route for it
                if(method.requestType === RequestType.GET) { this.router.get(prefix, middlewareHandler.getMiddleware(module, method, request), () => method.handle(request)); }
                if(method.requestType === RequestType.POST) { this.router.post(prefix, middlewareHandler.getMiddleware(module, method, request), () => method.handle(request)); }
                if(method.requestType === RequestType.PUT) { this.router.put(prefix, middlewareHandler.getMiddleware(module, method, request), () => method.handle(request)); }
                if(method.requestType === RequestType.DELETE) { this.router.delete(prefix, middlewareHandler.getMiddleware(module, method, request), () => method.handle(request)); }

            }
        }

        return this.router;
    }

}
