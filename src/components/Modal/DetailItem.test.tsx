import React from "react";
import { render, screen } from "@testing-library/react";
import DetailItem from "./DetailItem";

describe("DetailItem", () => {
  it("should render label and string value correctly", () => {
    render(<DetailItem label="Status" value="Ongoing" />);
    
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Ongoing")).toBeInTheDocument();
  });

  it("should render label and number value correctly", () => {
    render(<DetailItem label="Episodes" value={24} />);
    
    expect(screen.getByText("Episodes")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
  });

  it("should render with correct CSS classes", () => {
    render(<DetailItem label="Status" value="Ongoing" />);
    
    const labelElement = screen.getByText("Status");
    const valueElement = screen.getByText("Ongoing");
    
    expect(labelElement).toHaveClass("font-semibold", "text-gray-800");
    expect(valueElement).toHaveClass("text-gray-600");
  });

  it("should render zero as a valid number value", () => {
    render(<DetailItem label="Count" value={0} />);
    
    expect(screen.getByText("Count")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});