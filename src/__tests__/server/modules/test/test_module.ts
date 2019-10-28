import {Module} from "../../../../module/module";
import {ModuleMethod} from "../../../../module/module_method";
import {TestMethod} from "./methods/test_method";
import {RequiredNumberMethod} from "./methods/required_number";
import {RequiredStringMethod} from "./methods/required_string";
import {RequiredBooleanMethod} from "./methods/required_boolean";

export class TestModule implements Module {
    moduleMethods: ModuleMethod[] = [
        new TestMethod(),
        new RequiredNumberMethod(),
        new RequiredStringMethod(),
        new RequiredBooleanMethod()
    ];
    name: string = "test-module";

}