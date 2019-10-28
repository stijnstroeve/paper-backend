import Module from "./module";

export default class ModuleHandler {
    modules: Module[];
    constructor() {
        this.modules = [];
    }

    register(newModule: Module) {
        this.modules.push(newModule);
    }
    getModule(name: string): Module | null {
        let module = this.modules.find((module) => module.name === name);
        return module ? module : null;
    }
}
