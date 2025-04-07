import React, { useState } from 'react';

const items = ["React", "Angular", "Vue", "Svelte", "Next.js"];

function SearchFilter() {
  const [query, setQuery] = useState("");

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filteredItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default SearchFilter;