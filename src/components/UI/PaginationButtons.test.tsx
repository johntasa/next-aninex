import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './PaginationButtons';
import { PageInfo } from '@/interfaces/PageInfo';

describe('Pagination', () => {
  const mockSetPage = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination with correct page information', () => {
    const pageInfo: PageInfo = {
      currentPage: 2,
      lastPage: 5,
      hasNextPage: true,
      perPage: 10,
      total: 0,
      __typename: ''
    };

    render(<Pagination pageInfo={pageInfo} setPage={mockSetPage} />);

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    const pageInfo: PageInfo = {
      currentPage: 1,
      lastPage: 5,
      hasNextPage: true,
      perPage: 10,
      total: 0,
      __typename: ''
    };

    render(<Pagination pageInfo={pageInfo} setPage={mockSetPage} />);

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
    expect(previousButton).toHaveClass('cursor-not-allowed');
  });

  it('disables Next button on last page', () => {
    const pageInfo: PageInfo = {
      currentPage: 5,
      lastPage: 5,
      hasNextPage: false,
      perPage: 10,
      total: 0,
      __typename: ''
    };

    render(<Pagination pageInfo={pageInfo} setPage={mockSetPage} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass('cursor-not-allowed');
  });

  it('calls setPage with previous page number when Previous button is clicked', () => {
    const pageInfo: PageInfo = {
      currentPage: 3,
      lastPage: 5,
      hasNextPage: true,
      perPage: 10,
      total: 0,
      __typename: ''
    };

    render(<Pagination pageInfo={pageInfo} setPage={mockSetPage} />);

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    expect(mockSetPage).toHaveBeenCalledWith(2);
  });

  it('calls setPage with next page number when Next button is clicked', () => {
    const pageInfo: PageInfo = {
      currentPage: 3,
      lastPage: 5,
      hasNextPage: true,
      perPage: 10,
      total: 0,
      __typename: ''
    };

    render(<Pagination pageInfo={pageInfo} setPage={mockSetPage} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockSetPage).toHaveBeenCalledWith(4);
  });

  it('enables both buttons when on a middle page', () => {
    const pageInfo: PageInfo = {
      currentPage: 3,
      lastPage: 5,
      hasNextPage: true,
      perPage: 10,
      total: 0,
      __typename: ''
    };

    render(<Pagination pageInfo={pageInfo} setPage={mockSetPage} />);

    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    
    expect(previousButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    expect(previousButton).not.toHaveClass('cursor-not-allowed');
    expect(nextButton).not.toHaveClass('cursor-not-allowed');
  });
});