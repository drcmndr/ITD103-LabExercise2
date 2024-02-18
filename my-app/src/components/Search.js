// Search.js

import React from 'react';

const Search = ({ onSearch }) => {
  return (
    <div className="search-wrapper"> {/* Corrected classname to className */}
      <input
        type="text"
        className="search-bar"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by name..."
      />
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  );
};

export default Search;

