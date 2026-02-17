/**
 * URL utility functions
 * @module url
 */

/**
 * Converts URL query string to an object
 * @param {string} query - The query string to parse (without '?')
 * @returns {Object} An object containing the parsed parameters
 * @example
 * ```ts
 * getUrlParams('foo=bar&baz=qux') // => { foo: 'bar', baz: 'qux' }
 * getUrlParams('foo=bar&foo=baz') // => { foo: ['bar', 'baz'] }
 * ```
 */
export const getUrlParams = (query: string): Record<string, string | string[]> =>
  Array.from(new URLSearchParams(query)).reduce<Record<string, string | string[]>>(
    (p, [k, v]) =>
      Object.assign({}, p, {
        [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v,
      }),
    {}
  );
