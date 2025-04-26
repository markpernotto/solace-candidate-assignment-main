import { forwardRef } from "react";

export interface SearchBarProps {
  onInputChange: () => void;
  onReset: () => void;
}

const SearchBar = forwardRef<
  HTMLInputElement,
  SearchBarProps
>(({ onInputChange, onReset }, ref) => (
  <div className="items-center flex justify-between mx-2">
    <input
      type="text"
      placeholder="Search for a name, city, degree, phone number or years of experience"
      id="search-input"
      ref={ref}
      onChange={onInputChange}
      autoFocus
    />
    <button
      className="border bg-slate-400 text-gray-800 rounded-md p-2 m-2"
      onClick={onReset}
    >
      Clear Search
    </button>
  </div>
));

SearchBar.displayName = "SearchBar";
export default SearchBar;
