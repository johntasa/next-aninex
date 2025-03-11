import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./PaginationButtons";
import { useSearchFilters } from "@/hooks/useSearchFilters";

jest.mock("@/hooks/useSearchFilters", () => ({
  useSearchFilters: jest.fn()
}));

describe("Pagination", () => {
  const mockSetPage = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchFilters as jest.Mock).mockReturnValue({
      setPage: mockSetPage
    });
  });

  it("should render pagination with correct page information", () => {
    const pageInfo = {
      currentPage: 2,
      lastPage: 5,
      hasNextPage: true
    };

    render(<Pagination total={0} perPage={0} __typename={""} {...pageInfo} />);
    
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("should disable Previous button when on first page", () => {
    const pageInfo = {
      currentPage: 1,
      lastPage: 5,
      hasNextPage: true
    };

    render(<Pagination total={0} perPage={0} __typename={""} {...pageInfo} />);
    
    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
    expect(previousButton).toHaveClass("cursor-not-allowed");
  });

  it("should enable Previous button when not on first page", () => {
    const pageInfo = {
      currentPage: 2,
      lastPage: 5,
      hasNextPage: true
    };

    render(<Pagination total={0} perPage={0} __typename={""} {...pageInfo} />);
    
    const previousButton = screen.getByText("Previous");
    expect(previousButton).not.toBeDisabled();
    expect(previousButton).not.toHaveClass("cursor-not-allowed");
  });

  it("should disable Next button when on last page", () => {
    const pageInfo = {
      currentPage: 5,
      lastPage: 5,
      hasNextPage: false
    };

    render(<Pagination total={0} perPage={0} __typename={""} {...pageInfo} />);
    
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass("cursor-not-allowed");
  });

  it("should enable Next button when not on last page", () => {
    const pageInfo = {
      currentPage: 4,
      lastPage: 5,
      hasNextPage: true
    };

    render(<Pagination total={0} perPage={0} __typename={""} {...pageInfo} />);
    
    const nextButton = screen.getByText("Next");
    expect(nextButton).not.toBeDisabled();
    expect(nextButton).not.toHaveClass("cursor-not-allowed");
  });

  it("should call setPage with previous page number when Previous button is clicked", () => {
    const pageInfo = {
      currentPage: 3,
      lastPage: 5,
      hasNextPage: true
    };

    render(<Pagination total={0} perPage={0} __typename={""} {...pageInfo} />);
    
    fireEvent.click(screen.getByText("Previous"));
    expect(mockSetPage).toHaveBeenCalledWith(2);
  });

  it("should call setPage with next page number when Next button is clicked", () => {
    const pageInfo = {
      currentPage: 3,
      lastPage: 5,
      hasNextPage: true
    };

    render(<Pagination total={0} perPage={0} __typename={""} {...pageInfo} />);
    
    fireEvent.click(screen.getByText("Next"));
    expect(mockSetPage).toHaveBeenCalledWith(4);
  });
});