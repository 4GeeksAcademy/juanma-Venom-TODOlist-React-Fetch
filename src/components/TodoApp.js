import React, { useEffect, useState } from "react";

const username = "Juanma-venom";
const API_URL = `https://playground.4geeks.com/todo/todos/${Juanma-venom}`;

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify([]),
      headers: { "Content-Type": "application/json" }
    }).then(() => getTasks());
  }, []);

  const getTasks = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data.todos))
      .catch(err => console.error("Error al obtener tareas:", err));
  };

  const addTask = (label) => {
    if (label.trim() === "") return;

    const newTask = { label: label.trim(), is_done: false };

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setInput("");
        getTasks();
      })
      .catch(err => console.error("Error al agregar tarea:", err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
      .then(() => getTasks())
      .catch(err => console.error("Error al eliminar tarea:", err));
  };

  const clearAllTasks = () => {
    fetch(API_URL, {
      method: "DELETE"
    })
      .then(() => setTasks([]))
      .catch(err => console.error("Error al limpiar tareas:", err));
  };

  return (
    <div className="todo-container">
      <h1>Todo List con API</h1>
      <input
        type="text"
        value={input}
        placeholder="Escribe una tarea"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask(input)}
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.label}
            <button onClick={() => deleteTask(task.id)}>🗑</button>
          </li>
        ))}
      </ul>
      <button onClick={clearAllTasks}>Limpiar Todo</button>
    </div>
  );
};

export default TodoApp;
