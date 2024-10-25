import { isJsonString, stringifyJsonWithFallback, parseJsonWithFallback } from 'outilx';

describe('isJsonString', () => {
    it('valid JSON string', () => {
        expect(isJsonString('{"key": "value"}')).toBe(true);
    });

    it('invalid JSON string', () => {
        expect(isJsonString('{key: value}')).toBe(false);
    });

    it('non-string input', () => {
        expect(isJsonString(null as any)).toBe(false);
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
