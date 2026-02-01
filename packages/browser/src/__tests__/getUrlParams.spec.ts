import { getUrlParams } from "@outilx/browser";

describe("getUrlParams", () => {
  it("should return an empty object for an empty query string", () => {
    expect(getUrlParams("")).toEqual({});
  });

  it("should parse a single parameter", () => {
    expect(getUrlParams("foo=bar")).toEqual({ foo: "bar" });
  });

  it("should parse multiple parameters", () => {
    expect(getUrlParams("foo=bar&baz=qux")).toEqual({ foo: "bar", baz: "qux" });
  });

  it("should handle multiple values for the same parameter", () => {
    expect(getUrlParams("foo=bar&foo=baz")).toEqual({ foo: ["bar", "baz"] });
  });

  it("should handle parameters with different keys", () => {
    expect(getUrlParams("foo=bar&baz=qux&foo=baz")).toEqual({
      foo: ["bar", "baz"],
      baz: "qux",
    });
  });

  it("should handle URL encoded parameters", () => {
    expect(getUrlParams("foo=bar%20baz")).toEqual({ foo: "bar baz" });
  });

  it("should handle complex query strings", () => {
    const query =
      "name=John&age=30&name=Jane&hobbies=reading&hobbies=travelling";
    const expected = {
      name: ["John", "Jane"],
      age: "30",
      hobbies: ["reading", "travelling"],
    };
    expect(getUrlParams(query)).toEqual(expected);
  });
});
