// Remove unused import
import React from "react";
import { render, screen } from "@testing-library/react";
import Topbar from "./Topbar";

jest.mock("./TabLinks", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="tab-links">TabLinks Mock</div>
  };
});

describe("Topbar", () => {
  it("should render the ANINEX title", () => {
    render(<Topbar />);
    
    const titleElement = screen.getByText("ANINEX");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H1");
  });

  it("should render with correct title styles", () => {
    render(<Topbar />);
    
    const titleElement = screen.getByText("ANINEX");
    expect(titleElement).toHaveClass("text-xl", "font-bold", "sm:text-4xl", "cursor-default");
  });

  it("should render the TabLinks component", () => {
    render(<Topbar />);
    
    expect(screen.getByTestId("tab-links")).toBeInTheDocument();
  });

  it("should have fixed positioning and correct background", () => {
    render(<Topbar />);
    
    const topbarElement = screen.getByText("ANINEX").closest("div.fixed");
    expect(topbarElement).toHaveClass(
      "fixed",
      "top-0",
      "left-0",
      "right-0",
      "w-full",
      "bg-teal-700",
      "text-white",
      "shadow-md",
      "z-50"
    );
  });

  it("should have proper container layout", () => {
    render(<Topbar />);
    
    const containerElement = screen.getByText("ANINEX").parentElement;
    expect(containerElement).toHaveClass(
      "container",
      "mx-auto",
      "p-4",
      "flex",
      "items-center",
      "justify-between"
    );
  });
});