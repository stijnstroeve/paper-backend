import {Error} from "../error/error";
import ModuleRequest from "./module_request";

export default class DefaultResponse {
    request: ModuleRequest;
    success: boolean;
    data: any;
    error?: Error;
    constructor(request: ModuleRequest, success: boolean, data: any, error?: Error) {
        this.request = request;
        this.success = success;
        this.data = data;
        this.error = error;
    }
    json() {
        let object = {success: this.success};
        if(this.data) Object.assign(object, {data: this.data});
        if(this.error) {
            Object.assign(object, {error: this.error.json()});

            this.error.error = undefined; //Make sure the error itself doesnt get sent to the client.
        }

        return object;
    }
}
