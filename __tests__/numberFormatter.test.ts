import { NumberFormatter } from '../numberFormatter';

describe('NumberFormatter', () => {
  let formatter: NumberFormatter;

  beforeEach(() => {
    formatter = new NumberFormatter();
  });

  it('should format number as string', () => {
    expect(formatter.format(123)).toEqual('one hundred and twenty-three');
    expect(formatter.format(45)).toEqual('fourty-five');
    expect(formatter.format(1000)).toEqual('one thousand');
  });

  it('should throw error if input is not a number', () => {
    expect(() => formatter.format(('abc' as any))).toThrowError('Not a number');
  });

  it('should throw error if input number is out of range', () => {
    expect(() => formatter.format(-1)).toThrowError('Number not in range 0 - 100,000');
    expect(() => formatter.format(100001)).toThrowError('Number not in range 0 - 100,000');
  });
});