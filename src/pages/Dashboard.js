import React, { useState, useEffect } from 'react';

// Task Table Component
export default function TaskTable() {
  // Initialize tasks from localStorage or set to empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // New task fields
  const [newTask, setNewTask] = useState({
    name: '',
    assignee: '',
    date: '',
  });

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Handle adding new task
  const handleAddTask = () => {
    if (!newTask.name || !newTask.assignee || !newTask.date) {
      alert("Please fill all fields");
      return;
    }
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setNewTask({ name: '', assignee: '', date: '' }); // Clear the input fields
  };

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left w-1/12">✓</th>
            <th className="border px-4 py-2 text-left w-5/12">Task Name</th>
            <th className="border px-4 py-2 text-left w-3/12">Assignee</th>
            <th className="border px-4 py-2 text-left w-3/12">Due</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="border px-4 py-2">{task.name}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center">
                  <img
                    src="/path/to/avatar.jpg" // Placeholder avatar
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {task.assignee}
                </div>
              </td>
              <td className="border px-4 py-2">{task.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Task Form */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Add New Task</h3>
        <div className="mb-2">
          <input
            type="text"
            name="name"
            value={newTask.name}
            onChange={handleInputChange}
            placeholder="Task Name"
            className="border p-2 mr-2"
          />
          <input
            type="text"
            name="assignee"
            value={newTask.assignee}
            onChange={handleInputChange}
            placeholder="Assignee"
            className="border p-2 mr-2"
          />
          <input
            type="date"
            name="date"
            value={newTask.date}
            onChange={handleInputChange}
            className="border p-2"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
