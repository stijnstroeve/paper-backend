import ModuleHandler from "./module/module_handler";
import MiddlewareHandler from "./middleware/middleware_handler";
import Router from "./router/router";
import Module from "./module/module";
import PaperConfig from "./paper_config";
import express from "express";
import {Express} from "express-serve-static-core";
import Logger from "./logger/logger";
import {LogType} from "./logger/log_type";
import rateLimit from "express-rate-limit";

export default class Paper {
    protected logger: Logger;
    protected readonly config: PaperConfig;
    protected modules: ModuleHandler;
    protected middleware: MiddlewareHandler;
    protected router: Router;
    constructor(config: PaperConfig) {
        this.config = config;
        this.modules = new ModuleHandler();
        this.middleware = new MiddlewareHandler();
        this.router = new Router();
        this.logger = new Logger(this.config);
    }
    registerModule(module: Module) {
        this.modules.register(module);
    }
    getRoutes() {
        return this.router.registerRoutes(this.middleware, this.modules);
    }

}

export class ExpressPaper extends Paper {
    public app: Express;
    constructor(config: PaperConfig) {
        super(config);

        this.checkConfig();
        this.app = express();

        this.setup();
    }
    private checkConfig() {
        if(!this.config.express) throw new Error("Express config is not set.");
    }
    private setup() {
        if(this.config.express && this.config.express.rateLimitOptions) {
            const limit = rateLimit(this.config.express.rateLimitOptions);
            this.app.use(limit);
        }

    }
    listen(port?: number, callback?: () => void) {
        this.app.use(this.getRoutes());
        // @ts-ignore
        let listenerPort = port ? port : this.config.express.port;
        if(!listenerPort) throw new Error("Port not defined.");
        this.app.listen(listenerPort, () => {
            if(callback) {
                callback();
            } else {
                this.logger.logType(LogType.SUCCESS, "Started server on port " + listenerPort + ".");
            }
        });
    }

}
