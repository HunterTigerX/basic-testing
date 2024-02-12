// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = {
      a: 5,
      b: 3,
      action: Action.Add,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const rawInput = {
      a: 5,
      b: 3,
      action: Action.Subtract,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const rawInput = {
      a: 5,
      b: 3,
      action: Action.Multiply,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(15);
  });

  test('should divide two numbers', () => {
    const rawInput = {
      a: 6,
      b: 3,
      action: Action.Divide,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = {
      a: 6,
      b: 3,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(216);
  });

  test('should return null for invalid action', () => {
    const rawInput = {
      a: 6,
      b: 3,
      action: 'Exponentiate',
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const rawInput = {
      a: 'alpha',
      b: 'omega',
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(null);
  });
});
