import React, { useState, useEffect } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getTodolist();
  }, []);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask.trim()]);
      updateTodolist();
      setNewTask("");
    }
  };

  const deleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    updateTodolist();
  };

  function updateTodolist() {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/cam", {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp.text());
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getTodolist() {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/cam")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((responseAsJson) => {
        setTasks(responseAsJson);
        updateTodolist(); // Call updateTodolist after setting tasks
      })
      .catch((error) => {
        console.log("Looks like there was a problem: \n", error);
      });
  }

  const deleteAllTasks = () => {
    setTasks([]);
    updateTodolist(); // Call updateTodolist after setting tasks
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a task"
      />
      <button className="task" onClick={addTask}>
        Add a task
      </button>
      <div className="row justify-content-center">
        <div className="card col-4" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                {task}
                <button onClick={() => deleteTask(task)}>
                  <i className="fas fa-minus-square"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p>Current tasks: {tasks.length}</p>{" "}
      <button onClick={deleteAllTasks}>Delete All Tasks</button>
    </div>
  );
}

export default TodoList;


