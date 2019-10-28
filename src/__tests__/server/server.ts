import {ExpressPaper} from "../../paper";
import {TestModule} from "./modules/test/test_module";
import {ChildModule} from "./modules/child/child_module";

export class Server {
    server: ExpressPaper;
    constructor() {
        this.server = new ExpressPaper({
            environment: "development",
            suppressWarnings: false,
            suppressMessages: false,
            express: {

            }
        });

        this.register();
    }
    register() {
        this.server.registerModules([
            new TestModule(),
            new ChildModule()
        ]);
    }
    start() {
        this.server.listen(3001);
    }
}

new Server().start();