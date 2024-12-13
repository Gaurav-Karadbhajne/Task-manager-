import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditTaskForm = ({ taskToEdit, onEditTask, onDeleteTask, onCancel }) => {
  const [task, setTask] = useState({ ...taskToEdit });

  useEffect(() => {
    if (taskToEdit) {
      setTask({ ...taskToEdit });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description) {
      toast.error("Both Title & Description fields must be filled!");
      return;
    }
    onEditTask(task);
    toast.success("Task updated successfully!");
  };

  return (
    <div className="p-4 border border-gray-300 rounded bg-gray-50 mt-4">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <form className="flex flex-col items-start space-y-2" onSubmit={handleSubmit}>
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
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
            Save Changes
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            type="button"
            onClick={() => onDeleteTask(task.id)}
          >
            Delete Task
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
