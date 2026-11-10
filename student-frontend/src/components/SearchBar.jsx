import { useState } from 'react';

export default function SearchBar({ onSearch, onClear, isFiltering }) {
  const [section, setSection] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = section.trim();
    if (!trimmed) {
      return;
    }
    onSearch(trimmed);
  };

  const handleClear = () => {
    setSection('');
    onClear();
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Filter by section (e.g. BSIT-3A)..."
          value={section}
          onChange={(e) => setSection(e.target.value)}
          aria-label="Filter by section"
        />
        {section && (
          <button
            type="button"
            className="search-inline-clear"
            onClick={() => setSection('')}
            aria-label="Clear input"
          >
            &times;
          </button>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      {isFiltering && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClear}
        >
          Reset Filter
        </button>
      )}
    </form>
  );
}
