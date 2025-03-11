import React from "react";
import { render, screen } from "@testing-library/react";
import AnimeDetails from "./AnimeDetails";
import { Anime } from "@/interfaces/Anime";

const formatDate = (date: { year: number; month: number; day: number }): string => {
  if (!date.year) return "N/A";
  const semiFormattedDate = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
  return new Date(semiFormattedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

interface MockProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  [key: string]: unknown;
}

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: MockProps) => {
    return <div data-testid="mock-image" {...props} />;
  }
}));

describe("formatDate function", () => {
  it("should return 'N/A' when year is not provided", () => {
    const date = { year: 0, month: 5, day: 15 };
    expect(formatDate(date)).toBe("N/A");
  });

  it("should format date correctly with single-digit month and day", () => {
    const date = { year: 2023, month: 5, day: 9 };
    
    const originalDate = global.Date;
    const mockDate = new originalDate(2023, 4, 9);
    global.Date = jest.fn(() => mockDate) as unknown as DateConstructor;
    
    expect(formatDate(date)).toBe("May 9, 2023");
    
    global.Date = originalDate;
  });

  it("should format date correctly with double-digit month and day", () => {
    const date = { year: 2023, month: 12, day: 25 };
    
    const originalDate = global.Date;
    const mockDate = new originalDate(2023, 11, 25);
    global.Date = jest.fn(() => mockDate) as unknown as DateConstructor;
    
    expect(formatDate(date)).toBe("Dec 25, 2023");
    
    global.Date = originalDate;
  });

  it("should pad month and day with leading zeros in the intermediate format", () => {
    const date = { year: 2023, month: 1, day: 1 };
    
    const originalDate = global.Date;
    const mockDateConstructor = jest.fn();
    global.Date = jest.fn((arg) => {
      mockDateConstructor(arg);
      return new originalDate(arg);
    }) as unknown as DateConstructor;
    
    formatDate(date);
    
    expect(mockDateConstructor).toHaveBeenCalledWith("2023-01-01");
    
    global.Date = originalDate;
  });
});

describe("AnimeDetails component", () => {
  const mockAnime: Anime = {
    id: 1,
    title: {
      english: "Test Anime",
      native: "テストアニメ"
    },
    coverImage: { large: "test-image.jpg" },
    bannerImage: "test-banner.jpg",
    episodes: 24,
    averageScore: 85,
    status: "FINISHED",
    startDate: { year: 2022, month: 1, day: 15 },
    endDate: { year: 2022, month: 6, day: 30 },
    description: "Test description",
    trailer: {
      id: "1",
      site: "YouTube",
    },
  };

  it("should render all detail items with correct values", () => {
    const originalDate = global.Date;
    const mockStartDate = new originalDate(2022, 0, 15);
    const mockEndDate = new originalDate(2022, 5, 30);
    
    let dateCallCount = 0;
    global.Date = jest.fn((arg) => {
      if (arg) {
        dateCallCount++;
        return dateCallCount === 1 ? mockStartDate : mockEndDate;
      }
      return new originalDate();
    }) as unknown as DateConstructor;
    
    render(<AnimeDetails animeInfo={mockAnime} />);
    
    expect(screen.getByText("Episodes")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    
    expect(screen.getByText("Average Score")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("FINISHED")).toBeInTheDocument();
    
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("Jan 15, 2022")).toBeInTheDocument();
    
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Jun 30, 2022")).toBeInTheDocument();
    
    global.Date = originalDate;
  });

  it("should display N/A for missing dates", () => {
    const animeWithMissingDates = {
      ...mockAnime,
      startDate: { year: 0, month: 0, day: 0 },
      endDate: { year: 0, month: 0, day: 0 }
    };
    
    render(<AnimeDetails animeInfo={animeWithMissingDates} />);
    
    const dateElements = screen.getAllByText("N/A");
    expect(dateElements).toHaveLength(2);
  });
});