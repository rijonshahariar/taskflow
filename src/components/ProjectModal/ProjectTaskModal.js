import React, { useState } from 'react';

const ProjectTaskModal = ({ projectId, closeModal }) => {
  // Initialize tasks state from localStorage in a 'subTasks' array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('subTasks')) || [];
    const projectTasks = savedTasks.find((item) => item.projectId === projectId);
    return projectTasks ? projectTasks.tasks : [];
  });

  const [newTask, setNewTask] = useState('');

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask('');

      // Save updated tasks to localStorage as an array of objects
      const savedTasks = JSON.parse(localStorage.getItem('subTasks')) || [];
      const updatedSavedTasks = savedTasks.filter((item) => item.projectId !== projectId);
      updatedSavedTasks.push({ projectId, tasks: updatedTasks });
      localStorage.setItem('subTasks', JSON.stringify(updatedSavedTasks));
    }
  };

  // Handle task deletion
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    // Update tasks in localStorage
    const savedTasks = JSON.parse(localStorage.getItem('subTasks')) || [];
    const updatedSavedTasks = savedTasks.filter((item) => item.projectId !== projectId);
    updatedSavedTasks.push({ projectId, tasks: updatedTasks });
    localStorage.setItem('subTasks', JSON.stringify(updatedSavedTasks));
  };

  // Handle checkbox toggle (mark task as completed or not)
  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);

    // Update tasks in localStorage
    const savedTasks = JSON.parse(localStorage.getItem('subTasks')) || [];
    const updatedSavedTasks = savedTasks.filter((item) => item.projectId !== projectId);
    updatedSavedTasks.push({ projectId, tasks: updatedTasks });
    localStorage.setItem('subTasks', JSON.stringify(updatedSavedTasks));
  };

  return (
    <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Tasks for Project {projectId}</h2>

        <ul className="mb-4">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {/* Checkbox to toggle completion */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(index)}
                  className="mr-2"
                />
                {/* Task text with fading and line-through effect if completed */}
                <span className={`${task.completed ? 'line-through opacity-50' : ''}`}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Task
        </button>

        <div className="flex justify-end">
          <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskModal;
