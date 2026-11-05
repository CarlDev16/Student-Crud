import { useState } from 'react';

export default function SearchBar({ onSearch, onClear }) {
  const [section, setSection] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!section.trim()) {
      alert('Please enter a section to search.');
      return;
    }
    onSearch(section.trim());
  };

  const handleClear = () => {
    setSection('');
    onClear();
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search by section..."
        value={section}
        onChange={(e) => setSection(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      <button type="button" className="btn btn-secondary" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}
