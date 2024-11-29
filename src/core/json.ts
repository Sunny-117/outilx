import stringifyJSON from 'fast-json-stable-stringify';

export const isJsonString = (str: string) => {
    try {
        if (typeof JSON.parse(str) === 'object' && str !== null) {
            return true;
        }
    }
    catch (e) {
        console.log(e);
    }
    return false;
};

export function stringifyJsonWithFallback(json: unknown, fallbackValue: unknown) {
    if (json === undefined || json === null) {
        return `${fallbackValue}`;
    }
    try {
        return stringifyJSON(json);
    } catch {
        return fallbackValue;
    }
}


export function parseJsonWithFallback(jsonValue: any = '', fallbackValue?: unknown) {
    try {
        return JSON.parse(jsonValue);
    } catch {
        return fallbackValue ?? jsonValue;
    }
}
