import {RequestHandlerParams} from "express-serve-static-core";
import {Module} from "../module/module";
import {ModuleMethod} from "../module/module_method";

export abstract class Middleware {
    abstract handle(module: Module, method: ModuleMethod): RequestHandlerParams;
}
