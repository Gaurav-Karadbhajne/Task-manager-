import React, { useRef, useEffect, useState } from "react";
import { Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

const TaskTable = ({ tasks, filterStatus, onEditRequest, taskToEditId }) => {
  const tableRef = useRef(null);
  const tabulatorRef = useRef(null);

  const [selectedTaskId, setSelectedTaskId] = useState("");

  useEffect(() => {
    if (tabulatorRef.current) {
      tabulatorRef.current.destroy();
    }

    if (tableRef.current) {
      tabulatorRef.current = new Tabulator(tableRef.current, {
        layout: "fitColumns",
        columns: [
          { title: "Task ID", field: "id", width: 100 },
          { title: "Title", field: "title" },
          { title: "Description", field: "description" },
          { title: "Status", field: "status" },
        ],
      });
    }
  }, []);

  useEffect(() => {
    if (tabulatorRef.current) {
      const filteredTasks =
        filterStatus === "All" ? tasks : tasks.filter((task) => task.status === filterStatus);
      tabulatorRef.current.replaceData(filteredTasks);
    }
  }, [tasks, filterStatus]);

  const handleEditClick = () => {
    const taskToEdit = tasks.find((task) => task.id === Number(selectedTaskId));
    if (taskToEdit) {
      onEditRequest(taskToEdit);
    }
  };

  return (
    <div>
      <div className="mt-4 flex gap-4 sm:flex-row ">
        <select
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
        >
          <option value="" disabled>
            Select a task
          </option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleEditClick}
          disabled={!selectedTaskId}
        >
          Edit or Delete Task
        </button>
      </div>
      <div ref={tableRef} className="mt-4 border border-gray-200 rounded" />
      {taskToEditId === Number(selectedTaskId) && (
        <div className="mt-2">
          {/* Render Edit Task Form dynamically here */}
        </div>
      )}
    </div>
  );
};

export default TaskTable;
