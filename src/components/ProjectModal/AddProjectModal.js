import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const AddProjectModal = ({ closeModal, addProject }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [tasks, setTasks] = useState('');
  const [featured, isFeatured] = useState('');
  const [deadline, setDeadline] = useState('');
  const [subTasks, setSubTasks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      name,
      link,
      tasks,
      deadline,
      subTasks,
      featured,
      isFeatured: false,
      status: 'Pending',
    };
    addProject(newProject);
    closeModal();
  };

  return (
    <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-4xl mx-4 md:mx-auto md:max-w-2xl lg:max-w-3xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              placeholder='Project Name'
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder='Project Link'
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <textarea
              type="text"
              placeholder='Description'
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Deadline</label>
            <input
            datepicker
              type="date"
              placeholder="Date"
              
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">
            Add Project
          </button>
          <button
            onClick={closeModal}
            className="bg-white text-black px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
