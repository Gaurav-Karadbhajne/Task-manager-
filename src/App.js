import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import EditTaskForm from "./components/EditTaskForm";
import TaskTable from "./components/TaskTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        const mappedTasks = data.slice(0, 20).map((item) => ({
          id: item.id,
          title: item.title,
          description: item.title,
          status: item.completed ? "Done" : "To Do",
        }));
        setTasks(mappedTasks);
      });
  }, []);

  const handleAddTask = (task) => {
    const newTask = { id: Date.now(), ...task };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("Task added!");
  };

  const handleUpdateTask = (task) => {
    setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? task : t)));
    
    setTaskToEdit(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted!");
    setTaskToEdit(null);
  };

  const computeCounters = () => {
    const counters = { "To Do": 0, "In Progress": 0, Done: 0 };
    tasks.forEach((task) => {
      counters[task.status]++;
    });
    return counters;
  };

  const counters = computeCounters();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />

      <div className="flex flex-col sm:flex-row sm:items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
          className="border px-2 py-1 rounded w-full sm:w-auto "
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        {/* Display task counters aligned with the filter */}
        <div className="flex sm:space-x-4 space-x-0 sm:justify-start justify-center gap-2">
          <div className="text-sm font-semibold">
            <span className="text-blue-500">To Do: {counters["To Do"]}</span>
          </div>
          <div className="text-sm font-semibold">
            <span className="text-yellow-500">In Progress: {counters["In Progress"]}</span>
          </div>
          <div className="text-sm font-semibold">
            <span className="text-green-500">Done: {counters["Done"]}</span>
          </div>
        </div>
      </div>

      {/* Conditionally render EditTaskForm above TaskTable */}
      {taskToEdit && (
        <EditTaskForm
          taskToEdit={taskToEdit}
          onEditTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onCancel={() => setTaskToEdit(null)}
        />
      )}

      <TaskTable
        tasks={tasks}
        filterStatus={filterStatus}
        onEditRequest={(task) => setTaskToEdit(task)}
      />

      <ToastContainer />
    </div>
  );
};

export default App;
