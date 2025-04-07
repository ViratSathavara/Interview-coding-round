import React, { useState, useEffect } from "react";

function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 2000);

    return () => clearTimeout(handler);
  }, [query]);

  // Fetch API when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) return;
    fetch(`https://api.github.com/search/users?q=${debouncedQuery}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data);
      setResults(data.items || []);
    })}, [debouncedQuery]);

  return (
    <div>
      <h3>GitHub User Search</h3>
      <input
        type="text"
        value={query}
        placeholder="Search GitHub users..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
}
export default DebouncedSearch;