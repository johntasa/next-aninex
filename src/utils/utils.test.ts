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

describe("formatDate function", () => {
  const originalDate = global.Date;

  afterEach(() => {
    global.Date = originalDate;
  });

  it("should return 'N/A' when year is not provided", () => {
    const date = { year: 0, month: 5, day: 15 };
    expect(formatDate(date)).toBe("N/A");
  });

  it("should format date correctly with day provided", () => {
    const date = { year: 2023, month: 5, day: 15 };
    
    const mockDate = new originalDate("2023-05-16T00:00:00Z");
    global.Date = jest.fn(() => mockDate) as unknown as DateConstructor;
    mockDate.setDate = jest.fn();
    mockDate.getDate = jest.fn(() => 15);
    mockDate.toLocaleDateString = jest.fn(() => "May 16, 2023");
    
    expect(formatDate(date)).toBe("May 16, 2023");
    expect(mockDate.setDate).toHaveBeenCalledWith(16);
  });

  it("should format date correctly without day provided", () => {
    const date = { year: 2023, month: 5, day: 0 };
    
    const mockDate = new originalDate("2023-05-02T00:00:00Z");
    global.Date = jest.fn(() => mockDate) as unknown as DateConstructor;
    mockDate.setDate = jest.fn();
    mockDate.getDate = jest.fn(() => 1);
    mockDate.toLocaleDateString = jest.fn(() => "May 1, 2023");
    
    expect(formatDate(date)).toBe("May, 2023");
    expect(mockDate.setDate).toHaveBeenCalledWith(2);
  });

  it("should pad month and day with leading zeros", () => {
    const date = { year: 2023, month: 1, day: 2 };
    
    const originalDateConstructor = global.Date;
    const mockDateConstructor = jest.fn((dateString) => {
      expect(dateString).toBe("2023-01-02");
      return new originalDateConstructor(dateString);
    });
    global.Date = mockDateConstructor as unknown as DateConstructor;
    formatDate(date);
    expect(mockDateConstructor).toHaveBeenCalledWith("2023-01-02");
    global.Date = originalDateConstructor;
  });

  // it("should handle February 29 in leap years correctly", () => {
  //   const date = { year: 2020, month: 2, day: 29 };
  //   const result = formatDate(date);
  //   expect(result).toMatch(/Mar 1, 2020/);
  // });

  // it("should handle month rollover correctly", () => {
  //   const date = { year: 2023, month: 12, day: 31 };
  //   const result = formatDate(date);
  //   expect(result).toMatch(/Jan 1, 2024/);
  // });
});