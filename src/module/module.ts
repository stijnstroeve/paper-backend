import ModuleMethod from "./module_method";

export default abstract class Module {
    abstract name: string;
    abstract moduleMethods: ModuleMethod[];
}
