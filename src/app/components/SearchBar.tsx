import { forwardRef } from "react";

export interface SearchBarProps {
  onInputChange: () => void;
  onReset: () => void;
}

const SearchBar = forwardRef<
  HTMLInputElement,
  SearchBarProps
>(({ onInputChange, onReset }, ref) => (
  <div>
    <p>Search</p>
    <p>
      <label
        htmlFor="searchInput"
        className="mr-2"
      >
        Searching for:{" "}
      </label>
      <input
        type="text"
        placeholder="Search for a name, city, degree, phone number or years of experience"
        id="searchInput"
        ref={ref}
        className="border border-solid border-black rounded-md"
        onChange={onInputChange}
      />
    </p>
    <button onClick={onReset}>
      Reset Search
    </button>
  </div>
));

SearchBar.displayName = "SearchBar";
export default SearchBar;
