import React, { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { MdAddBox } from 'react-icons/md';
import { RiCloseLargeFill } from 'react-icons/ri';

const ProjectTaskModal = ({ projectId,project, closeModal }) => {
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
      <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold mb-10">{project.name}'s Tasklist</h2>
          <button onClick={closeModal} className="text-red-500 mb-10 text-2xl rounded">
          <RiCloseLargeFill />
          </button>
          
        </div>
        

        <ul className="mb-4">
          {tasks.map((task, index) => (
            <li key={index} className={`flex border-b-2 justify-between items-center mb-2 ${task.completed ? 'bg-green-50 opacity-50' : ''}`}>
              <div className="flex mb-2 items-center" >
                {/* Checkbox to toggle completion */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(index)}
                  className="mr-2 h-5 w-5 accent-black"
                />
                {/* Task text with fading and line-through effect if completed */}
                <span >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(index)}
                className="text-black mb-2 text-2xl rounded"
              >
                <FiDelete/>
              </button>
            </li>
          ))}
        </ul>

        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task Name"
          className="border rounded-md p-2 w-full mb-2"
        />
        <button
          onClick={handleAddTask}
          className="text-black text-3xl rounded mb-4"
        >
          <MdAddBox />
        </button>

        
      </div>
    </div>
  );
};

export default ProjectTaskModal;
