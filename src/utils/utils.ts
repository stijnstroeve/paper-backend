
export class Utils {
    /**
     * Creates a simple clone of the given object by using json parsing
     * @param originalObject The object to clone
     */
    static fastClone(originalObject: Object) {
        return JSON.parse(JSON.stringify(originalObject));
    }
}
