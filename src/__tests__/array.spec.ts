import { shuffleArray } from "../core/array";

describe('shuffleArray', () => {
    it('should shuffle the array', () => {
        const array = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray([...array]); // 使用扩展运算符以避免修改原数组
        expect(shuffled).not.toEqual(array); // 期望打乱后的数组与原数组不同
        expect(shuffled.sort()).toEqual(array.sort()); // 期望打乱后的数组包含相同的元素
    });

    it('should return an empty array when input is empty', () => {
        const result = shuffleArray([]);
        expect(result).toEqual([]); // 期望返回空数组
    });

    it('should return a single-element array unchanged', () => {
        const result = shuffleArray([1]);
        expect(result).toEqual([1]); // 期望返回相同的单元素数组
    });
});