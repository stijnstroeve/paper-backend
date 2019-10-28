import Paper, {ExpressPaper} from "./src/paper";
import PaperConfig, {ExpressPaperConfig} from "./src/paper_config";
import Utils from "./src/utils/utils";
import Router from "./src/router/router";
import DefaultResponse from "./src/requests/default_response";
import ModuleRequest from "./src/requests/module_request";
import IParameter from "./src/requests/parameter";
import {RequestType} from "./src/requests/request_type";
import Module from "./src/module/module";
import ModuleHandler from "./src/module/module_handler";
import ModuleMethod from "./src/module/module_method";
import MiddlewareHandler from "./src/middleware/middleware_handler";
import Middleware from "./src/middleware/middleware";
import Logger from "./src/logger/logger";
import {DataType, ParameterType} from "./src/data_types/data_type";
import Error from "./src/error/error";
import ErrorType from "./src/error/error_type";
import {Color} from "./src/logger/color";

export default Paper;
export {
    ExpressPaper,
    PaperConfig,
    ExpressPaperConfig,
    Utils,
    Router,
    DefaultResponse,
    ModuleRequest,
    IParameter,
    RequestType,
    Module,
    ModuleHandler,
    ModuleMethod,
    MiddlewareHandler,
    Middleware,
    Logger,
    DataType,
    ParameterType,
    Error,
    ErrorType,
    Color
};
