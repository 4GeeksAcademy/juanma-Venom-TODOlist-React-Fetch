import React, { useEffect, useState } from "react";

const username = "Juanma-venom";
const API_URL = `https://assets.breatheco.de/apis/fake/todos/user/${username}`;

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
   fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify([])
})
      .then((res) => {
      if (res.status === 201 || res.status === 200) {
        console.log("Usuario creado");
        return getTasks();
      } else if (res.status === 400) {
        console.log("Usuario ya existe, cargando tareas");
        return getTasks();
      } else {
        throw new Error("Error creando usuario");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

  const getTasks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
         console.log("Tareas obtenidas:", data); 
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.warn("Datos recibidos no son un array", data);
          setTasks([]);
        }
      })
      .catch((err) => console.error("Error al obtener tareas:", err));
  };

  const addTask = (label) => {
    if (label.trim() === "") return;

    const newTask = { label: label.trim(), is_done: false };

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al agregar tarea");
        }
        setInput("");
        return getTasks();
      })
      .catch((err) => console.error(err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar tarea");
        }
        return getTasks();
      })
      .catch((err) => console.error(err));
  };

  const clearAllTasks = () => {
    Promise.all(
      tasks.map((task) =>
        fetch(`${API_URL}/${task.id}`, {
          method: "DELETE",
        })
      )
    )
      .then(() => getTasks())
      .catch((err) => console.error("Error al limpiar tareas:", err));
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
