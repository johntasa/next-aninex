export interface Filters {
  search?: string;
  genre?: string;
  seasonYear?: string;
  status?: string;
  season?: string;
}

export interface SelectProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}