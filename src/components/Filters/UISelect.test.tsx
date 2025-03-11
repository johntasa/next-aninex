import { render, screen, fireEvent } from '@testing-library/react';
import UISelect from './UISelect';
import { formatText } from '@/utils/utils';

jest.mock('@/utils/utils', () => ({
  formatText: jest.fn((text) => `Formatted ${text}`)
}));

describe('UISelect', () => {
  const mockProps = {
    id: 'test-select',
    label: 'Test Label',
    value: 'Option1',
    options: ['Option1', 'Option2', 'Option3'],
    handleChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct label and options', () => {
    render(<UISelect {...mockProps} />);
    expect(screen.getByText('Test Label')).toBeTruthy();
    const selectElement = screen.getByLabelText('Test Label');
    expect(selectElement.id).toBe('test-select');
    expect(screen.getByText('Any')).toBeTruthy();
    expect(screen.getByText('Formatted Option1')).toBeTruthy();
    expect(screen.getByText('Formatted Option2')).toBeTruthy();
    expect(screen.getByText('Formatted Option3')).toBeTruthy();
    
    expect(formatText).toHaveBeenCalledTimes(3);
    expect(formatText).toHaveBeenCalledWith('Option1');
    expect(formatText).toHaveBeenCalledWith('Option2');
    expect(formatText).toHaveBeenCalledWith('Option3');
  });

  it('selects the correct default value', () => {
    render(<UISelect {...mockProps} />);
    
    const selectElement = screen.getByLabelText('Test Label') as HTMLSelectElement;
    expect(selectElement.value).toBe('Option1');
  });

  it('calls handleChange when selection changes', () => {
    render(<UISelect {...mockProps} />);
    
    const selectElement = screen.getByLabelText('Test Label');
    fireEvent.change(selectElement, { target: { id: 'test-select', value: 'Option2' } });
    expect(mockProps.handleChange).toHaveBeenCalledTimes(1);
  });

  it('selects "Any" option correctly', () => {
    render(<UISelect {...mockProps} value="Any" />);
    
    const selectElement = screen.getByLabelText('Test Label') as HTMLSelectElement;
    expect(selectElement.value).toBe('Any');
  });

  it('renders correctly with empty options array', () => {
    render(<UISelect {...mockProps} options={[]} />);
    
    expect(screen.getByText('Any')).toBeTruthy();
    expect(screen.queryByText('Formatted Option1')).toBeNull();
  });
});