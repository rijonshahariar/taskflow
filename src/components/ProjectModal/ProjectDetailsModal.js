import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { MdAddBox } from "react-icons/md";

const ProjectDetailsModal = ({ project, closeModal, updateProject }) => {
  const [name, setName] = useState(project.name);
  const [link, setLink] = useState(project.link);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status || 'pending');
  const [deadline, setDeadline] = useState(project.deadline);
  const [subTasks, setSubTasks] = useState(
    project.subTasks ? project.subTasks.split(',').map((task) => ({ text: task, completed: false })) : []
  );
  const [newSubTask, setNewSubTask] = useState('');

  const handleSave = () => {
    const updatedProject = {
      ...project,
      name,
      link,
      status,
      description,
      deadline,
      subTasks: subTasks.map((task) => task.text).join(','),
    };
    updateProject(updatedProject);
    closeModal();
  };

  const handleAddSubTask = () => {
    if (newSubTask) {
      setSubTasks([...subTasks, { text: newSubTask, completed: false }]);
      setNewSubTask('');
    }
  };

  const handleToggleComplete = (index) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index].completed = !updatedSubTasks[index].completed;
    setSubTasks(updatedSubTasks);
  };

  const handleDeleteSubTask = (index) => {
    const updatedSubTasks = subTasks.filter((_, i) => i !== index);
    setSubTasks(updatedSubTasks);
  };

  return (
    <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl mx-4 md:mx-auto md:max-w-2xl lg:max-w-3xl">
        <div className="h-full max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">{name}'s Details</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              type="text"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Project Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Project Status</label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 rounded-md w-full bg-white appearance-none"
              >
                <option value="Pending">Pending</option>
                <option value="In progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12l-5-5h10l-5 5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={handleSave} className="bg-black text-white px-4 py-2 rounded-md mr-2">
            Save
          </button>
          <button onClick={closeModal} className="text-black px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
