import React from "react";
import { render, screen } from "@testing-library/react";
import DetailItem from "./DetailItem";

describe("DetailItem", () => {
  it("should render label and string value correctly", () => {
    render(<DetailItem label="Status" value="Ongoing" />);
    
    expect(screen.getByText("Status")).toBeDefined();
    expect(screen.getByText("Ongoing")).toBeDefined();
  });

  it("should render label and number value correctly", () => {
    render(<DetailItem label="Episodes" value={24} />);
    
    expect(screen.getByText("Episodes")).toBeDefined();
    expect(screen.getByText("24")).toBeDefined();
  });

  it("should render with correct CSS classes", () => {
    render(<DetailItem label="Status" value="Ongoing" />);
    
    const labelElement = screen.getByText("Status");
    const valueElement = screen.getByText("Ongoing");
    
    expect(labelElement.className).toContain("font-semibold text-gray-800");
    expect(valueElement.className).toContain("text-gray-600");
  });

  it("should render zero as a valid number value", () => {
    render(<DetailItem label="Count" value={0} />);
    
    expect(screen.getByText("Count")).toBeDefined();
    expect(screen.getByText("0")).toBeDefined();
  });
});