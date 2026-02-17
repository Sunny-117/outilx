import { isJsonString, stringifyJsonWithFallback, parseJsonWithFallback } from '..';

describe('isJsonString', () => {
    it('valid JSON object string', () => {
        expect(isJsonString('{"key": "value"}')).toBe(true);
    });

    it('valid JSON array string', () => {
        expect(isJsonString('[1, 2, 3]')).toBe(true);
    });

    it('valid JSON null string', () => {
        expect(isJsonString('null')).toBe(false);
    });

    it('invalid JSON string with unquoted keys', () => {
        expect(isJsonString('{key: value}')).toBe(false);
    });

    it('invalid JSON string with trailing comma', () => {
        expect(isJsonString('{"key": "value",}')).toBe(false);
    });

    it('invalid JSON string with single quotes', () => {
        expect(isJsonString("{'key': 'value'}")).toBe(false);
    });

    it('non-string input - null', () => {
        expect(isJsonString(null as any)).toBe(false);
    });

    it('non-string input - number', () => {
        expect(isJsonString(123 as any)).toBe(false);
    });

    it('non-string input - boolean', () => {
        expect(isJsonString(true as any)).toBe(false);
    });

    it('non-string input - undefined', () => {
        expect(isJsonString(undefined as any)).toBe(false);
    });

    it('non-string input - object', () => {
        expect(isJsonString({} as any)).toBe(false);
    });

    it('empty string', () => {
        expect(isJsonString('')).toBe(false);
    });

    it('JSON primitive string (not object/array)', () => {
        expect(isJsonString('"hello"')).toBe(false);
    });

    it('JSON number string (not object/array)', () => {
        expect(isJsonString('123')).toBe(false);
    });

    it('JSON boolean string (not object/array)', () => {
        expect(isJsonString('true')).toBe(false);
    });
});

describe('stringifyJsonWithFallback', () => {
    it('valid object', () => {
        expect(stringifyJsonWithFallback({ key: 'value' }, 'fallback')).toBe('{"key":"value"}');
    });

    it('invalid object', () => {
        expect(stringifyJsonWithFallback(undefined, 'fallback')).toBe('fallback');
    });
});

describe('parseJsonWithFallback', () => {
    it('valid JSON string', () => {
        expect(parseJsonWithFallback('{"key": "value"}')).toEqual({ key: 'value' });
    });

    it('invalid JSON string with fallback', () => {
        expect(parseJsonWithFallback('{key: value}', 'fallback')).toBe('fallback');
    });

    it('fallback value is used', () => {
        expect(parseJsonWithFallback('{key: value}', undefined)).toBe('{key: value}');
    });

    it('default value', () => {
        expect(parseJsonWithFallback()).toBe('');
    });
});
