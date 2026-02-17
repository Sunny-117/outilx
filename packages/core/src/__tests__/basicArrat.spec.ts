import { createIncrementingArray } from "..";

describe("array", () => {
  it("createIncrementingArray", () => {
    const res = createIncrementingArray(3);
    expect(res).toEqual([1, 2, 3]);
  });
});
