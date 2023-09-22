import React, { useState } from "react"; 

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const deleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter(task => task !== taskToDelete);
    setTasks(updatedTasks);
  };


  const deleteAllTasks = () => {
   
    setTasks([]);
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
              <li key={index} className="list-group-item d-flex justify-content-between">
                {task}
                <button onClick={() => deleteTask(task)}>
                  <i className="fas fa-minus-square"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p>Current tasks: {tasks.length}</p>  <button onClick={deleteAllTasks}>
        Delete All Tasks
      </button>
    </div>
  );
}


export default TodoList;
