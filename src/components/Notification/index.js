import React, { useState, useEffect } from 'react';

const NotificationButton = () => {
    const [dueTasksCount, setDueTasksCount] = useState(0);
    const [dueProjectsCount, setDueProjectsCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasNotifications, setHasNotifications] = useState(false);
    const notificationRef = useRef(null);
  
    // Helper function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };
  
    const checkNotifications = () => {
      const today = getTodayDate();
  
      // Get tasks and projects from localStorage
      const tasksData = JSON.parse(localStorage.getItem('tables')) || {};
      const tasks = tasksData.rows || []; // Access the 'row' object within tasks

      console.log(tasksData.rows[0]);
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
  
      // Filter tasks and projects that are due today
      const dueTasks = tasks.filter(task => task.due === today);
      const dueProjects = projects.filter(project => project.deadline === today);
  
      setDueTasksCount(dueTasks.length);
      setDueProjectsCount(dueProjects.length);
      setHasNotifications(dueTasks.length > 0 || dueProjects.length > 0);
    };
  
    // Handle the notification button click
    const handleNotificationClick = () => {
      checkNotifications(); // Check for new notifications when the button is clicked
      setShowNotifications(!showNotifications); // Toggle notification box visibility
    };
  
    // Handle closing the notification box when clicking outside
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false); // Close the notification if clicked outside
      }
    };
  
    // Add event listener to close notifications on click outside
    useEffect(() => {
      if (showNotifications) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showNotifications]);


  return (
    <div className="relative inline-block">

      {/* Notification Box */}
      <div className="absolute mt-2 right-0 w-64 bg-white shadow-lg rounded-lg p-4 text-gray-700">
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        {hasNotifications ? (
          <>
            {dueTasksCount > 0 && (
              <p>{dueTasksCount} task(s) due today.</p>
            )}
            {dueProjectsCount > 0 && (
              <p>{dueProjectsCount} project(s) deadline today.</p>
            )}
          </>
        ) : (
          <p>No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationButton;
