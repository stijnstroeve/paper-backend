import {Module} from "../../../../module/module";
import {ModuleMethod} from "../../../../module/module_method";
import {ChildMethod} from "./methods/child_method";

export class ChildModule implements Module {
    moduleMethods: ModuleMethod[] = [
        new ChildMethod()
    ];
    name: string = "child-module";
    parentModule: string = "test-module"

}