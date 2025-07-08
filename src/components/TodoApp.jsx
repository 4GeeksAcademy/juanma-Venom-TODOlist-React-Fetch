import React, { useEffect, useState } from "react";

const username = "Juanma-venom";
const API_URL = `https://playground.4geeks.com/todo/users/${username}`;

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
   fetch(`https://playground.4geeks.com/todo/users/${username}`, {
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
    fetch(`https://playground.4geeks.com/todo/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.todos)) {
          setTasks(data.todos);
          console.log(tasks)
        } else {
          setTasks([]);
        }
      })
      .catch((err) => console.error("Error al obtener tareas:", err));
  };
  

  const addTask = (label) => {
    if (label.trim() === "") return;

    const newTask = { label: label.trim(), is_done: false };

    fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
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
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
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
        fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
          method: "DELETE",
        })
      )
    )
      .then(() => getTasks())
      .catch((err) => console.error("Error al limpiar tareas:", err));
  };

  const listitem = tasks.map((task,index) =>
    <li key={index} className="task-item d-flex p-3 ps-5 border-bottom">
        {task.label} <button className="dltButton ms-auto" onClick={() => deleteTask(task.id)}>X</button>
        </li>
  )

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
        {listitem}
      </ul>
      <button onClick={clearAllTasks}>Limpiar Todo</button>
    </div>
  );
};

export default TodoApp;
