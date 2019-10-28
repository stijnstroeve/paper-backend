import {Module} from "./module";

export class ModuleHandler {
    modules: Module[];
    constructor() {
        this.modules = [];
    }

    register(newModule: Module) {
        if(!!this.getModule(newModule.name)) {
            throw new Error("Module '" + newModule.name + "' is already registered.");
        }
        this.modules.push(newModule);
    }
    getModule(name: string): Module | null {
        let module = this.modules.find((module) => module.name === name);
        return module ? module : null;
    }
}
