import React, { useEffect, useState } from 'react';
import './Style.css';

const InfiniteScrolling = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1); // Reset page on new query
      setUsers([]); // Clear old users
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch GitHub users
  const fetchUsers = async () => {
    if (!debouncedQuery) return;
    setLoading(true);
    const res = await fetch(
      `https://api.github.com/search/users?q=${debouncedQuery}&page=${page}&per_page=10`
    );
    const data = await res.json();
    if (data.items) {
      setUsers((prev) => [...prev, ...data.items]);
    }
    setLoading(false);
  };

  // Fetch users when debouncedQuery or page changes
  useEffect(() => {
    fetchUsers();
  }, [debouncedQuery, page]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      if (bottom && !loading) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="container">
      <h2>GitHub User Search</h2>
      <input
        type="text"
        placeholder="Search GitHub Users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
      />
      <div className="list">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <img src={user.avatar_url} alt={user.login} />
            <p>{user.login}</p>
            <a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a>
          </div>
        ))}
      </div>
      {loading && <p>Loading more users...</p>}
    </div>
  );
};

export default InfiniteScrolling;
// CSS styles