import React, { useState } from "react";
import { toast } from "react-toastify";

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description) {
      toast.error("Both Title & Description fields must be filled!");
      return;
    }
    onAddTask(task);
    setTask({ title: "", description: "", status: "To Do" });
  };

  return (
    <form className="flex flex-col items-start space-y-2 mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        className="border p-2 rounded w-full"
        value={task.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        className="border p-2 rounded w-full"
        value={task.description}
        onChange={handleChange}
      />
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
};

export default TaskForm;
