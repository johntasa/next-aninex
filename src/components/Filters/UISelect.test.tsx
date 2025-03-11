import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UISelect from "./UISelect";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { formatText } from "@/utils/utils";
import "@testing-library/jest-dom";


jest.mock("@/hooks/useSearchFilters", () => ({
  useSearchFilters: jest.fn(),
}));

jest.mock("@/utils/utils", () => ({
  formatText: jest.fn((text) => `Formatted ${text}`),
}));

describe("UISelect Component", () => {
  const mockUpdateFilter = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchFilters as jest.Mock).mockReturnValue({
      updateFilter: mockUpdateFilter,
    });
    (formatText as jest.Mock).mockImplementation((text) => `Formatted ${text}`);
  });

  const defaultProps = {
    id: "testSelect",
    label: "Test Label",
    value: "Option1",
    options: ["Option1", "Option2", "Option3"],
  };

  test("renders with correct label and options", () => {
    render(<UISelect {...defaultProps} />);
    
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("Option1");
    
    expect(screen.getByText("Any")).toBeInTheDocument();
    expect(screen.getByText("Formatted Option1")).toBeInTheDocument();
    expect(screen.getByText("Formatted Option2")).toBeInTheDocument();
    expect(screen.getByText("Formatted Option3")).toBeInTheDocument();
  });

  test("calls updateFilter when selection changes", () => {
    render(<UISelect {...defaultProps} />);
    
    const selectElement = screen.getByRole("combobox");
    
    fireEvent.change(selectElement, { target: { value: "Option2" } });
    
    expect(mockUpdateFilter).toHaveBeenCalledWith("testSelect", "Option2");
  });

  test("renders with 'Any' option selected when value is 'Any'", () => {
    render(<UISelect {...defaultProps} value="Any" />);
    
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("Any");
  });

  test("applies correct CSS classes", () => {
    render(<UISelect {...defaultProps} />);
    
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveClass("bg-white");
    expect(selectElement).toHaveClass("text-sm");
    expect(selectElement).toHaveClass("w-full");
    expect(selectElement).toHaveClass("p-2");
    expect(selectElement).toHaveClass("rounded-lg");
  });

  test("associates label with select element using htmlFor", () => {
    render(<UISelect {...defaultProps} />);
    
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toHaveAttribute("for", "testSelect");
    
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveAttribute("id", "testSelect");
  });
});