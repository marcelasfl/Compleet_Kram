
type ValueObject = {
    [key: string]: any;
};
export function getValueByPath(obj: ValueObject, path: string[] | undefined): any {
    if (!path) return undefined;
    return path.reduce((current, key) => (current && current.hasOwnProperty(key) ? current[key] : undefined), obj);
}
