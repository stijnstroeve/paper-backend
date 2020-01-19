import {Module} from "./module";

export class ModuleHandler {
    modules: Module[];

    constructor() {
        this.modules = [];
    }

    /**
     * Adds the given module to the modules list
     * @param module The module to add
     */
    public addModule(module: Module) {
        if(!!this.findModule(module.name)) {
            throw new Error(`Module '${module.name}' is already registered.`);
        }
        this.modules.push(module);
    }

    /**
     * Tries to retrieve a module by the given name
     * @param name The name of the module to find
     * @returns The found module or null if none was found
     */
    public findModule(name: string): Module | null {
        return this.modules.find((module) => module.name === name) || null;
    }
}
