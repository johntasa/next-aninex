import React from "react";
import { render, screen } from "@testing-library/react";
import TopAnimes from "./TopAnimes";
import { useLazyQuery } from "@apollo/client";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { Anime } from "@/interfaces/Anime";

jest.mock("@/api/queries", () => ({
  GET_TOP_ANIMES: "MOCKED_QUERY"
}));

jest.mock("@apollo/client", () => ({
  useLazyQuery: jest.fn()
}));

jest.mock("@/hooks/useSearchFilters", () => ({
  useSearchFilters: jest.fn()
}));

jest.mock("@/components/UI/AnimeList", () => ({
  __esModule: true,
  default: ({ animes }: { animes: Anime[] }) => (
    <div data-testid="anime-list">
      {animes.length} animes
    </div>
  )
}));

jest.mock("@/components/UI/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>
}));

describe("TopAnimes", () => {
  const mockGetTopAnimes = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("should call getTopAnimes when no active filters", () => {
    (useSearchFilters as jest.Mock).mockReturnValue({
      hasActiveFilters: false
    });
    
    (useLazyQuery as jest.Mock).mockReturnValue([
      mockGetTopAnimes,
      { loading: false, error: null, data: null }
    ]);
    
    render(<TopAnimes />);
    
    expect(mockGetTopAnimes).toHaveBeenCalledWith({
      variables: {
        season: "WINTER",
        seasonYear: 2025
      }
    });
  });
  
  it("should not call getTopAnimes when active filters exist", () => {
    (useSearchFilters as jest.Mock).mockReturnValue({
      hasActiveFilters: true
    });
    
    (useLazyQuery as jest.Mock).mockReturnValue([
      mockGetTopAnimes,
      { loading: false, error: null, data: null }
    ]);
    
    render(<TopAnimes />);
    
    expect(mockGetTopAnimes).not.toHaveBeenCalled();
  });
  
  it("should render loader when loading", () => {
    (useSearchFilters as jest.Mock).mockReturnValue({
      hasActiveFilters: false
    });
    
    (useLazyQuery as jest.Mock).mockReturnValue([
      mockGetTopAnimes,
      { loading: true, error: null, data: null }
    ]);
    
    render(<TopAnimes />);
    
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
  
  it("should render error message when error occurs", () => {
    (useSearchFilters as jest.Mock).mockReturnValue({
      hasActiveFilters: false
    });
    
    (useLazyQuery as jest.Mock).mockReturnValue([
      mockGetTopAnimes,
      { loading: false, error: { message: "Test error" }, data: null }
    ]);
    
    render(<TopAnimes />);
    
    expect(screen.getByText("Error: Test error")).toBeInTheDocument();
  });
  
  it("should render loader when no data is available", () => {
    (useSearchFilters as jest.Mock).mockReturnValue({
      hasActiveFilters: false
    });
    
    (useLazyQuery as jest.Mock).mockReturnValue([
      mockGetTopAnimes,
      { loading: false, error: null, data: null }
    ]);
    
    render(<TopAnimes />);
    
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
  
  it("should render anime sections when data is available", () => {
    (useSearchFilters as jest.Mock).mockReturnValue({
      hasActiveFilters: false
    });
    
    const mockData = {
      season: {
        media: [{ id: 1 }, { id: 2 }]
      },
      popular: {
        media: [{ id: 3 }, { id: 4 }, { id: 5 }]
      }
    };
    
    (useLazyQuery as jest.Mock).mockReturnValue([
      mockGetTopAnimes,
      { loading: false, error: null, data: mockData }
    ]);
    
    render(<TopAnimes />);
    
    expect(screen.getByText("POPULAR THIS SEASON")).toBeInTheDocument();
    expect(screen.getByText("ALL TIME POPULAR")).toBeInTheDocument();
    expect(screen.getAllByTestId("anime-list").length).toBe(2);
    expect(screen.getAllByTestId("anime-list")[0]).toHaveTextContent("2 animes");
    expect(screen.getAllByTestId("anime-list")[1]).toHaveTextContent("3 animes");
  });
});