import stringifyJSON from 'fast-json-stable-stringify';

/**
 * JSON utility functions
 * @module json
 */

/**
 * Checks if a string is valid JSON
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is valid JSON
 * @example
 * ```ts
 * isJsonString('{"key": "value"}') // => true
 * isJsonString('{key: value}') // => false
 * ```
 */
export const isJsonString = (str: string) => {
    try {
        const parsed = JSON.parse(str);
        return typeof parsed === 'object' && parsed !== null;
    } catch (e) {
        // Silent error, no console.log for better performance
        return false;
    }
};

/**
 * Safely stringifies a JSON value with fallback
 * @param {unknown} json - The value to stringify
 * @param {unknown} fallbackValue - Value to return if stringification fails
 * @returns {string} Stringified JSON or fallback value
 * @example
 * ```ts
 * stringifyJsonWithFallback({ key: 'value' }, 'fallback') // => '{"key":"value"}'
 * stringifyJsonWithFallback(undefined, 'fallback') // => 'fallback'
 * ```
 */
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

/**
 * Safely parses a JSON string with fallback
 * @param {any} [jsonValue=''] - The JSON string to parse
 * @param {unknown} [fallbackValue] - Value to return if parsing fails
 * @returns {any} Parsed JSON object or fallback value
 * @example
 * ```ts
 * parseJsonWithFallback('{"key": "value"}') // => { key: 'value' }
 * parseJsonWithFallback('{key: value}', 'fallback') // => 'fallback'
 * ```
 */
export function parseJsonWithFallback(jsonValue: any = '', fallbackValue?: unknown) {
    try {
        return JSON.parse(jsonValue);
    } catch {
        return fallbackValue ?? jsonValue;
    }
}
