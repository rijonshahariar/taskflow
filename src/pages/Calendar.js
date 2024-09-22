import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isSameDay, addMonths } from 'date-fns';
import DashNav from '../components/DashNav';
import { Helmet } from 'react-helmet-async';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskText, setTaskText] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    setTasks(storedTasks);
  }, []);

  // Days of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get start and end of the month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);

  // Days array to render calendar grid
  let days = [];
  let day = startDate;
  while (day <= monthEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  // Open the modal for adding tasks
  const openModal = (day) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  // Close the task modal
  const closeModal = () => setIsModalOpen(false);

  // Add task to the selected date and save to localStorage
  const addTask = () => {
    if (taskText.trim()) {
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      const updatedTasks = {
        ...tasks,
        [dateKey]: [...(tasks[dateKey] || []), taskText],
      };
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to localStorage
      setTaskText('');
      closeModal();
    }
  };

  // Render tasks for a specific day
  const renderTasks = (day) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    return tasks[dateKey]?.map((task, index) => (
      <div key={index} className="text-sm bg-gray-100 text-blue-700 p-1 mt-1 rounded">
        {task}
      </div>
    )) || null;
  };

  return (
    <div className="max-w-screen-xl	mx-auto font-inter">
    <Helmet>
      <title>TaskFlow</title>
    </Helmet>
    <DashNav/>
    <div className="container p-4">
      {/* Navigation for Months */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-gray-500 text-white px-4 py-2"
          onClick={() => setCurrentDate(addMonths(currentDate, -1))}
        >
          Previous Month
        </button>
        <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button
          className="bg-gray-500 text-white px-4 py-2"
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        >
          Next Month
        </button>
      </div>

     

      {/* Calendar Grid (Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`p-2 border rounded-md cursor-pointer ${
              isSameMonth(day, currentDate) ? 'bg-white' : 'bg-gray-100'
            } ${isSameDay(day, new Date()) ? "border-blue-500 text-blue-500 " : ''}`}
            onClick={() => openModal(day)}
          >
            {/* Display date and day of the week */}
            <p className="font-sm"><span className='text-2xl text-red-500 text-center rounded-full mr-2'>{format(day, 'd')} </span>{format(day, 'EEEE')}</p>
            {renderTasks(day)}
          </div>
        ))}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">
              Add Task for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <input
              type="text"
              className="border p-2 w-full mt-4"
              placeholder="Enter task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <button className="bg-black rounded-md text-white px-4 py-2 mt-4" onClick={addTask}>
              Add Task
            </button>
            <button className="text-black px-4 py-2 mt-4" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Calendar;
