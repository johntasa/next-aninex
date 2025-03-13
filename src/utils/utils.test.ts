import { formatText, formatDate } from "./utils";

describe("formatText function", () => {
  it("should return 'Any' when input is 'Any'", () => {
    expect(formatText("Any")).toBe("Any");
  });

  it("should format single word with first letter capitalized", () => {
    expect(formatText("HELLO")).toBe("Hello");
    expect(formatText("world")).toBe("World");
  });

  it("should format multiple words separated by underscores", () => {
    expect(formatText("HELLO_WORLD")).toBe("Hello World");
    expect(formatText("first_second_third")).toBe("First Second Third");
  });

  it("should handle mixed case input correctly", () => {
    expect(formatText("MiXeD_cAsE_TeXt")).toBe("Mixed Case Text");
  });

  it("should handle empty string", () => {
    expect(formatText("")).toBe("");
  });

  it("should handle strings with no underscores", () => {
    expect(formatText("SINGLEWORD")).toBe("Singleword");
  });

  it("should handle strings with consecutive underscores", () => {
    expect(formatText("DOUBLE__UNDERSCORE")).toBe("Double  Underscore");
  });

  it("should handle strings with leading or trailing underscores", () => {
    expect(formatText("_LEADING")).toBe(" Leading");
    expect(formatText("TRAILING_")).toBe("Trailing ");
  });
});

describe('formatDate', () => {
  it('should return "N/A" if year is not provided', () => {
    expect(formatDate({ year: 0, month: 5, day: 15 })).toBe('N/A');
    expect(formatDate({ year: null as unknown as number, month: 5, day: 15 })).toBe('N/A');
  });

  it('should format date with day provided', () => {
    const result = formatDate({ year: 2023, month: 5, day: 15 });
    expect(result).toBe('May 15, 2023');
  });

  it('should format date without day (month and year only)', () => {
    const result = formatDate({ year: 2023, month: 5, day: null as unknown as number });
    expect(result).toBe('May, 2023');
  });

  it('should handle January correctly', () => {
    const result = formatDate({ year: 2023, month: 1, day: 15 });
    expect(result).toBe('Jan 15, 2023');
  });

  it('should handle December correctly', () => {
    const result = formatDate({ year: 2023, month: 12, day: 25 });
    expect(result).toBe('Dec 25, 2023');
  });

  it('should handle leap year date', () => {
    const result = formatDate({ year: 2024, month: 2, day: 29 });
    expect(result).toBe('Feb 29, 2024');
  });

  it('should handle month-only format for all months', () => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    for (let i = 1; i <= 12; i++) {
      const result = formatDate({ year: 2023, month: i, day: 0 });
      expect(result).toBe(`${months[i-1]}, 2023`);
    }
  });
});