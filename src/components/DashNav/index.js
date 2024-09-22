import { useEffect, useState, useRef } from "react";
import { BsFillMoonStarsFill, BsStars } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { GoProjectSymlink, GoTasklist } from "react-icons/go";
import { IoBookOutline, IoCalendarOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

export default function DashNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Todos"); // State for the active link

    const handleSetActive = (linkName) => {
        setActiveLink(linkName);
    };

    const navigate = useNavigate();
    const [authUser] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
        navigate("/");
    };

    const [dueTasksCount, setDueTasksCount] = useState(0);
    const [dueProjectsCount, setDueProjectsCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
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

        // Get tasks (tables) and projects from localStorage
        const tasksData = JSON.parse(localStorage.getItem('tables')) || []; // Assuming tables are stored under 'tables'
        const projects = JSON.parse(localStorage.getItem('projects')) || [];

        let totalDueTasks = 0;

        // Loop through each table and its rows to check due dates
        tasksData.forEach((table) => {
            if (table.rows) {
                table.rows.forEach((row) => {
                    if (row.due === today) {
                        totalDueTasks += 1;
                    }
                });
            }
        });

        // Filter projects that are due today
        const dueProjects = projects.filter(project => project.deadline === today);

        setDueTasksCount(totalDueTasks);
        setDueProjectsCount(dueProjects.length);
    };

    window.onload = function (e) {
        checkNotifications();
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            checkNotifications();
        }, 100);
        return () => clearInterval(intervalId);
    }, []);

    // Handle the notification button click
    const handleNotificationClick = () => {
        // Check for new notifications when the button is clicked
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
        <div>
            <nav className="bg-white sticky top-0 z-50 mb-4 shadow">
                <div className="max-w-7xl   mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="h-8 w-auto"
                                src="logo555.png"
                                alt="Logo"
                            />
                        </div>

                        {/* Links (visible on larger screens) */}
                        <div className="hidden md:flex items-center space-x-8">
                            <NavLink
                                as={Link}
                                className={({ isActive }) => (isActive ? "border-b-4 flex items-center border-black text-gray-900" : "flex items-center text-gray-500")}
                                to="/tasks"

                            >
                                <GoTasklist /> <span className="ms-1">Tasks</span>
                            </NavLink>
                            <NavLink
                                as={Link}
                                className={({ isActive }) => (isActive ? "border-b-4 border-black text-gray-900 flex items-center" : "flex items-center text-gray-500")}
                                to="/read"
                            >
                                <IoBookOutline /><span className="ms-1">Reading List</span>
                            </NavLink>
                            <NavLink
                                as={Link}
                                className={({ isActive }) => (isActive ? "border-b-4 flex items-center border-black text-gray-900" : "flex items-center text-gray-500")}
                                to="/projects"
                            >
                                <GoProjectSymlink /><span className="ms-1">Project Planner</span>
                            </NavLink>
                            <NavLink
                                as={Link}
                                className={({ isActive }) => (isActive ? "border-b-4 flex items-center border-black text-gray-900" : "flex items-center text-gray-500")}
                                to="/calendar"
                            >
                                <IoCalendarOutline />
                                <span className="ms-1">Calendar</span>
                            </NavLink>
                        </div>

                        {/* Right-side buttons */}
                        <div className="flex items-center space-x-4">
                            {/* New Job button (hidden on mobile) */}
                            <a href={authUser ? '/ai' : '/login'} className="hidden md:flex border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-md items-center space-x-2">
                                <BsStars /> <span>TaskFlow AI</span>
                            </a>

                            {/* Notification bell */}
                            <div className="relative">
                                <button onClick={handleNotificationClick} className="text-gray-500 hover:text-gray-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                                        />
                                    </svg>

                                </button>
                                {(dueTasksCount > 0 || dueProjectsCount > 0) && (
                                    <div class="w-5 h-5 bg-red-500 rounded-full text-center text-white text-sm absolute -top-2 -end-2">
                                        {dueTasksCount + dueProjectsCount}
                                        <div class="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-red-200 w-full h-full" ></div>
                                    </div>

                                )}
                            </div>

                            {/* User profile and dropdown */}
                            <div className="relative">
                                <button
                                    className="flex items-center text-gray-500 hover:text-gray-700"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <div className="flex items-center justify-center">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726963200&semt=ais_hybrid"
                                            alt="User avatar"
                                        />
                                        <RiArrowDropDownLine />
                                    </div>
                                </button>

                                {/* User dropdown */}
                                {menuOpen && (
                                    <div className="absolute z-40 right-0 mt-2 w-48 bg-white shadow-lg py-2 rounded-lg">
                                         {authUser ? (<a
                                            href="#"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </a>) : (<></>)}
                                        
                                        {authUser ? (<a
                                            href="#"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Settings
                                        </a>) : (<a
                                            href="/login"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Login
                                        </a>)}
                                        
                                        {authUser ? (<NavLink
                                            onClick={logout}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </NavLink>) : (<a
                                            href="/register"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Register
                                        </a>)}

                                    </div>
                                )}
                            </div>

                            {/* Mobile menu toggle button */}
                            <div className="flex md:hidden">
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {mobileMenuOpen ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16m-7 6h7"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                            <a
                                href="/tasks"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                            >
                                Tasks
                            </a>
                            <a
                                href="/read"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700"
                            >
                                Reading List
                            </a>
                            <a
                                href="/projects"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700"
                            >
                                Project Planner
                            </a>
                            <a
                                href="#"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700"
                            >
                                Calendar
                            </a>
                            <a href='/ai' className="flex border border-indigo-600 font-medium bg-indigo-600 text-white px-4 py-2 justify-center rounded-md items-center space-x-2">
                                <BsStars /> <span>TaskFlow AI </span>
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {showNotifications && (
                <div
                    ref={notificationRef}
                    className="absolute right-5 z-50 w-auto bg-white shadow-lg rounded-lg p-4 text-gray-700"
                >
                    <h3 className="text-lg  font-semibold mb-2">Notifications</h3>
                    {(dueTasksCount > 0 || dueProjectsCount > 0) ? (
                        <>
                            {dueTasksCount > 0 && <Link to='/tasks' className="px-2 flex items-center justify-start rounded-md py-2 hover:bg-gray-300 bg-gray-200"><FaFire className="mr-1" />  {dueTasksCount} task(s) due today.</Link>}
                            {dueProjectsCount > 0 && <Link to="/projects" className="mt-2 flex items-center justify-start rounded-md px-2 py-2 hover:bg-gray-300 bg-gray-200"><FaFire className="mr-1" />{dueProjectsCount} project(s) deadline today.</Link>}
                        </>
                    ) : (
                        <p>No new notifications</p>
                    )}
                </div>
            )}
        </div>
    );
}
