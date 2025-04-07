import React, { useState } from 'react';

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <ul>
        {todos.map((t, i) => (
          <li key={i}>
            {t} <button onClick={() => deleteTask(i)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
}
 export default Todo;