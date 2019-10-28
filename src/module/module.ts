import {ModuleMethod} from "./module_method";

export abstract class Module {
    abstract name: string;
    abstract moduleMethods: ModuleMethod[];
    abstract parentModule?: string;
}
