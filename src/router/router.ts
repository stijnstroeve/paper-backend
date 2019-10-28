import express from "express";
import {RequestType} from "../requests/request_type";
import {MiddlewareHandler} from "../middleware/middleware_handler";
import {ModuleHandler} from "../module/module_handler";
import {ModuleRequest} from "../requests/module_request";
import {Module} from "../module/module";
import {Utils} from "../utils/utils";

export class Router {
    router = express.Router();

    static getFullPath(module: Module, moduleHandler: ModuleHandler): string {
        let path: string = "/";
        let modules = [];

        let currentModule: Module | null = module;
        while(currentModule && !!currentModule.parentModule) {
            let newModule = moduleHandler.getModule(currentModule.parentModule);
            if(newModule) {
                modules.push(newModule);
                currentModule = newModule;
            } else {
                throw new Error("Module '" + currentModule.parentModule + "' not found!");
            }
        }
        modules = modules.reverse();
        modules.forEach((module) => {
            path += module.name + "/";
        });
        path += module.name + "/";
        return path;
    }

    registerRoutes(middlewareHandler: MiddlewareHandler, moduleHandler: ModuleHandler): express.Router {
        for(let i = 0; i < moduleHandler.modules.length; i++) {
            let module = moduleHandler.modules[i];

            for(let x = 0; x < module.moduleMethods.length; x++) {
                let method =  module.moduleMethods[x];
                let prefix = Router.getFullPath(module, moduleHandler) + method.request;
                const request: ModuleRequest = new ModuleRequest(method);

                if(method.requestType === RequestType.GET) { this.router.get(prefix, middlewareHandler.getMiddleware(module, method, request), () => method.handle(request)); }
                if(method.requestType === RequestType.POST) { this.router.post(prefix, middlewareHandler.getMiddleware(module, method, request), () => method.handle(request)); }
                if(method.requestType === RequestType.PUT) { this.router.put(prefix, middlewareHandler.getMiddleware(module, method, request), () => method.handle(request)); }
                if(method.requestType === RequestType.DELETE) { this.router.delete(prefix, middlewareHandler.getMiddleware(module, method, request), () => method.handle(request)); }

            }
        }

        return this.router;
    }

}
