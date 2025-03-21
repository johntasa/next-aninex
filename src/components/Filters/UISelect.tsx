import { SelectProps } from "@/interfaces/Filters";
import { formatText } from "@/utils/utils";

export default function UISelect({id, label, value, options, handleChange}: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="bg-white text-sm w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
      >
        <option value="Any">Any</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatText(option)}
          </option>
        ))}
      </select>
    </div>
  );
}