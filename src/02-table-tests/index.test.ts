import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 5, b: 3, action: Action.Add, expected: 8 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 3, b: 2, action: 'Exponentiate', expected: null },
  { a: 2, b: 3, action: 'Exponentiate', expected: null },
  { a: 4, b: 6, action: 'Exponentiate', expected: null },
  { a: 'alpha', b: 'omega', action: Action.Exponentiate, expected: null },
  { a: 'omega', b: 'alpha', action: Action.Exponentiate, expected: null },
  { a: undefined, b: null, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('testing cases', ({ a, b, action, expected }) => {
    const rawInput = {
      a,
      b,
      action,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(expected);
  });
});
