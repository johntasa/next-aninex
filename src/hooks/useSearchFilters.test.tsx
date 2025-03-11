import { renderHook, act } from "@testing-library/react";
import { useSearchFilters } from "./useSearchFilters";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { setAnimeList, setError, setFilters, setLoading, setPageInfo, setCurrentPage } from "@/redux/animeSlice";
import { GET_ANIMES } from "@/api/queries";

jest.mock("@/api/queries", () => ({
  GET_ANIMES: "MOCKED_QUERY"
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock("@apollo/client", () => ({
  useQuery: jest.fn()
}));

jest.mock("@/redux/animeSlice", () => ({
  setAnimeList: jest.fn(() => ({ type: "setAnimeList" })),
  setError: jest.fn(() => ({ type: "setError" })),
  setFilters: jest.fn(() => ({ type: "setFilters" })),
  setLoading: jest.fn(() => ({ type: "setLoading" })),
  setPageInfo: jest.fn(() => ({ type: "setPageInfo" })),
  setCurrentPage: jest.fn(() => ({ type: "setCurrentPage" }))
}));

interface DebounceFn {
  (fn: () => void): () => void;
}

jest.mock("just-debounce-it", () => ((fn: DebounceFn) => fn) as unknown as DebounceFn);

describe("useSearchFilters", () => {
  const mockDispatch = jest.fn();
  const defaultFilters = {
    searchTerm: "",
    status: "",
    season: "",
    year: "",
    genre: ""
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      filters: defaultFilters,
      currentPage: 1
    });
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: null
    });
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useSearchFilters());
    
    expect(result.current.filters).toEqual(defaultFilters);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.hasActiveFilters).toBe(false);
    expect(typeof result.current.updateFilter).toBe("function");
    expect(typeof result.current.setPage).toBe("function");
  });

  it("should detect active filters correctly when no filters are set", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      filters: defaultFilters,
      currentPage: 1
    });
    
    const { result } = renderHook(() => useSearchFilters());
    
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("should detect active filters correctly when search term is set", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      filters: { ...defaultFilters, searchTerm: "test" },
      currentPage: 1
    });
    
    const { result } = renderHook(() => useSearchFilters());
    
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it("should detect active filters correctly when status is set", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      filters: { ...defaultFilters, status: "FINISHED" },
      currentPage: 1
    });
    
    const { result } = renderHook(() => useSearchFilters());
    
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it("should not consider 'Any' as an active filter", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      filters: { ...defaultFilters, status: "Any" },
      currentPage: 1
    });
    
    const { result } = renderHook(() => useSearchFilters());
    
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("should call useQuery with correct variables", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      filters: { 
        ...defaultFilters, 
        searchTerm: "test",
        status: "FINISHED",
        season: "WINTER",
        year: "2023",
        genre: "Action"
      },
      currentPage: 2
    });
    
    renderHook(() => useSearchFilters());
    
    expect(useQuery).toHaveBeenCalledWith(GET_ANIMES, expect.objectContaining({
      variables: {
        search: "test",
        status: "FINISHED",
        season: "WINTER",
        seasonYear: 2023,
        genre_in: ["Action"],
        page: 2
      },
      skip: false
    }));
  });

  it("should skip query when no active filters", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      filters: defaultFilters,
      currentPage: 1
    });
    
    renderHook(() => useSearchFilters());
    
    expect(useQuery).toHaveBeenCalledWith(GET_ANIMES, expect.objectContaining({
      skip: true
    }));
  });

  it("should dispatch setAnimeList and setPageInfo on query completion", () => {
    const mockData = {
      Page: {
        media: [{ id: 1 }, { id: 2 }],
        pageInfo: { currentPage: 1, hasNextPage: true, lastPage: 10 }
      }
    };
    
    (useQuery as jest.Mock).mockImplementation((_query, options) => {
      options.onCompleted(mockData);
      return { loading: false, error: null, data: mockData };
    });
    
    renderHook(() => useSearchFilters());
    
    expect(setAnimeList).toHaveBeenCalledWith(mockData.Page.media);
    expect(setPageInfo).toHaveBeenCalledWith(mockData.Page.pageInfo);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it("should dispatch setError and empty setAnimeList on query error", () => {
    const mockError = { message: "Test error" };
    
    (useQuery as jest.Mock).mockImplementation((_query, options) => {
      options.onError(mockError);
      return { loading: false, error: mockError, data: null };
    });
    
    renderHook(() => useSearchFilters());
    
    expect(setError).toHaveBeenCalledWith(mockError.message);
    expect(setAnimeList).toHaveBeenCalledWith([]);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it("should update filters correctly when updateFilter is called", () => {
    const { result } = renderHook(() => useSearchFilters());
    
    act(() => {
      result.current.updateFilter("status", "FINISHED");
    });
    
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setFilters).toHaveBeenCalledWith({ ...defaultFilters, status: "FINISHED" });
    expect(setCurrentPage).toHaveBeenCalledWith(1);
    expect(setAnimeList).toHaveBeenCalledWith([]);
    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });

  it("should convert 'Any' to empty string when updateFilter is called", () => {
    const { result } = renderHook(() => useSearchFilters());
    
    act(() => {
      result.current.updateFilter("status", "Any");
    });
    
    expect(setFilters).toHaveBeenCalledWith({ ...defaultFilters, status: "" });
  });

  it("should update page correctly when setPage is called", () => {
    const { result } = renderHook(() => useSearchFilters());
    
    act(() => {
      result.current.setPage(3);
    });
    
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setCurrentPage).toHaveBeenCalledWith(3);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});