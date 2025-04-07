import React, { useEffect, useState } from "react";

const PaginatedUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setTotalPages(data.total_pages);
      });
  }, [page]);

  return (
    <div>
      <h2>Paginated Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.first_name} width={40} />
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀ Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default PaginatedUsers;
