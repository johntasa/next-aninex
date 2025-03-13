import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FiltersBar from "./FiltersBar";
import { useSearchFilters } from "../../hooks/useSearchFilters";

jest.mock("@/hooks/useSearchFilters", () => ({
  useSearchFilters: jest.fn()
}));

jest.mock("@/utils/constants", () => ({
  GENRES: [{ value: "action", label: "Action" }],
  YEARS: [{ value: "2023", label: "2023" }],
  STATUSES: [{ value: "ongoing", label: "Ongoing" }],
  SEASONS: [{ value: "winter", label: "Winter" }]
}));

jest.mock("./UISelect", () => ({
  __esModule: true,
  default: ({ id, label, options, value, onChange }: { id: string; label: string; options: Array<{ value: string; label: string }>; value: string; onChange?: (value: string) => void }) => (
    <div data-testid={`ui-select-${id}`}>
      <label htmlFor={id}>{label}</label>
      <select 
        id={id} 
        value={value} 
        onChange={e => onChange && onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}));

describe("FiltersBar Component", () => {
  const mockStore = configureStore([]);
  const mockUpdateFilter = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useSearchFilters as jest.Mock).mockReturnValue({
      updateFilter: mockUpdateFilter
    });
  });

  it("renders correctly with all filters", () => {
    const initialState = {
      anime: {
        filters: {
          searchTerm: "",
          genre: "action",
          year: "2023",
          status: "ongoing",
          season: "winter"
        }
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <FiltersBar categories={[]} />
      </Provider>
    );
    
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    
    expect(screen.getByTestId("ui-select-genre")).toBeInTheDocument();
    expect(screen.getByTestId("ui-select-year")).toBeInTheDocument();
    expect(screen.getByTestId("ui-select-status")).toBeInTheDocument();
    expect(screen.getByTestId("ui-select-season")).toBeInTheDocument();
  });

  it("displays the current search term from the store", () => {
    const initialState = {
      anime: {
        filters: {
          searchTerm: "Naruto",
          genre: "",
          year: "",
          status: "",
          season: ""
        }
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <FiltersBar categories={[]} />
      </Provider>
    );
    
    const searchInput = screen.getByLabelText("Search") as HTMLInputElement;
    expect(searchInput.value).toBe("Naruto");
  });

  it("calls updateFilter when search input changes", () => {
    const initialState = {
      anime: {
        filters: {
          searchTerm: "",
          genre: "",
          year: "",
          status: "",
          season: ""
        }
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <FiltersBar categories={[]} />
      </Provider>
    );
    
    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "One Piece" } });
    
    expect(mockUpdateFilter).toHaveBeenCalledWith("searchTerm", "One Piece");
  });

  it("renders the search icon", () => {
    const initialState = {
      anime: {
        filters: {
          searchTerm: "",
          genre: "",
          year: "",
          status: "",
          season: ""
        }
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <FiltersBar categories={[]} />
      </Provider>
    );
    
    const svgPath = document.querySelector("svg path");
    expect(svgPath).toBeInTheDocument();
    expect(svgPath?.getAttribute("d")).toBe("M10 2a8 8 0 105.293 14.707l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z");
  });

  it("has proper responsive layout classes", () => {
    const initialState = {
      anime: {
        filters: {
          searchTerm: "",
          genre: "",
          year: "",
          status: "",
          season: ""
        }
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <FiltersBar categories={[]}/>
      </Provider>
    );
    
    const gridContainer = screen.getByText("Search").closest(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1");
    expect(gridContainer).toHaveClass("md:grid-cols-5");
    expect(gridContainer).toHaveClass("gap-4");
  });
});