
export default class Utils {
    static fastClone(originalObject: Object) {
        return JSON.parse(JSON.stringify(originalObject));
    }
}
