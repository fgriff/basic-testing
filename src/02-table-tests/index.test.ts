// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 2, action: 'action', expected: null },
  { a: 3, b: 2, action: 'mult', expected: null },
  { a: 3, b: 2, action: 'div', expected: null },
  { a: '2', b: 3, action: Action.Add, expected: null },
  { a: 2, b: '3', action: Action.Add, expected: null },
  { a: '2', b: '3', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test('should run tests', () => {
    testCases.forEach(({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expected !== null
        ? expect(expected).toBe(result)
        : expect(expected).toBeNull();
    });
  });
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)('should run tests', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(expected).toBe(result);
  });
});
