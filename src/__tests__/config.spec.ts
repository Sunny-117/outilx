import { getConfigFromDataSource } from "outilx";

describe("getConfigFromDataSource", () => {
  it("should return correct mappings for provided data source", () => {
    const dataSource = [
      [1, "A", "文案A"],
      [2, "B", "文案B"],
      [3, "C", "文案C"],
    ] as const;

    const result = getConfigFromDataSource(dataSource);

    // 验证结果
    expect(result.valueMapByKey).toEqual({ A: 1, B: 2, C: 3 });
    expect(result.keyMapByValue).toEqual({ 1: "A", 2: "B", 3: "C" });
    expect(result.nameMapByValue).toEqual({
      1: "文案A",
      2: "文案B",
      3: "文案C",
    });
    expect(result.nameMapByKey).toEqual({ A: "文案A", B: "文案B", C: "文案C" });
    expect(result.dataSource).toEqual([
      { label: "文案A", value: 1, key: "A" },
      { label: "文案B", value: 2, key: "B" },
      { label: "文案C", value: 3, key: "C" },
    ]);
  });

  it("should throw an error for duplicate keys", () => {
    const dataSource = [
      [1, "A", "文案A"],
      [2, "A", "文案B"], // Duplicate key 'A'
    ] as const;

    expect(() => getConfigFromDataSource(dataSource)).toThrowError(
      'Duplicate key "A" found in dataSource.'
    );
  });

  it("should throw an error for duplicate values", () => {
    const dataSource = [
      [1, "A", "文案A"],
      [1, "B", "文案B"], // Duplicate value '1'
    ] as const;

    expect(() => getConfigFromDataSource(dataSource)).toThrowError(
      'Duplicate value "1" found in dataSource.'
    );
  });
});
