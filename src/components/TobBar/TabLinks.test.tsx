import React from "react";
import { render, screen } from "@testing-library/react";
import NavLinks from "./TabLinks";
import { usePathname } from "next/navigation";
import { TABS } from "@/utils/constants";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

jest.mock("next/link", () => {
  const LinkComponent = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  LinkComponent.displayName = "MockedLink";
  return LinkComponent;
});

describe("NavLinks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all tabs from TABS constant", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    
    render(<NavLinks />);
    
    TABS.forEach(tab => {
      expect(screen.getByText(tab.name)).toBeTruthy();
    });
  });

  it("should highlight the active tab based on current pathname", () => {
    const activeTab = TABS[0];
    (usePathname as jest.Mock).mockReturnValue(activeTab.href);
    
    render(<NavLinks />);
    
    const activeElement = screen.getByText(activeTab.name);
    expect(activeElement.classList.contains("text-white")).toBe(true);
    expect(activeElement.closest("a")).not.toBeNull();
  });

  it("should not highlight inactive tabs", () => {
    const activeTab = TABS[0];
    const inactiveTab = TABS[1];
    (usePathname as jest.Mock).mockReturnValue(activeTab.href);
    
    render(<NavLinks />);
    
    const inactiveElement = screen.getByText(inactiveTab.name);
    expect(inactiveElement.classList.contains("text-gray-300")).toBe(true);
    expect(inactiveElement.classList.contains("text-white")).toBe(false);
  });

  it("should render all tabs with correct href attributes", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    
    render(<NavLinks />);
    
    TABS.forEach(tab => {
      const link = screen.getByText(tab.name).closest("a");
      expect(link?.getAttribute("href")).toBe(tab.href);
    });
  });

  it("should apply hover styles to all tabs", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    
    render(<NavLinks />);
    
    TABS.forEach(tab => {
      const element = screen.getByText(tab.name);
      expect(element.className).toContain("hover:text-white");
    });
  });
});