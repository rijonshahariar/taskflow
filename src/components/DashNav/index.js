import { useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function DashNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Todos"); // State for the active link

    const handleSetActive = (linkName) => {
        setActiveLink(linkName);
    };

    return (
        <nav className="bg-white mb-4 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        <a
                            href="#"
                            onClick={() => handleSetActive("Todos")}
                            className={`${activeLink === "Todos"
                                ? "border-b-4 border-black text-gray-900"
                                : "text-gray-500"
                                } font-medium hover:text-gray-700 transition duration-300`}
                        >
                            Todos
                        </a>
                        <a
                            href="#"
                            onClick={() => handleSetActive("Reading List")}
                            className={`${activeLink === "Reading List"
                                    ? "border-b-4 border-black text-gray-900"
                                    : "text-gray-500"
                                } font-medium hover:text-gray-700 transition duration-300`}
                        >
                            Reading List
                        </a>
                        <a
                            href="#"
                            onClick={() => handleSetActive("Projects")}
                            className={`${activeLink === "Projects"
                                ? "border-b-4 border-black text-gray-900"
                                : "text-gray-500"
                                } font-medium hover:text-gray-700 transition duration-300`}
                        >
                            Projects
                        </a>
                        <a
                            href="#"
                            onClick={() => handleSetActive("Calendar")}
                            className={`${activeLink === "Calendar"
                                ? "border-b-4 border-black text-gray-900"
                                : "text-gray-500"
                                } font-medium hover:text-gray-700 transition duration-300`}
                        >
                            Calendar
                        </a>
                    </div>

                    {/* Right-side buttons */}
                    <div className="flex items-center space-x-4">
                        {/* New Job button (hidden on mobile) */}
                        <button className="hidden md:flex border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md items-center space-x-2">
                            <span>Ask AI </span><BsFillMoonStarsFill />
                        </button>

                        {/* Notification bell */}
                        <button className="text-gray-500 hover:text-gray-700">
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

                        {/* User profile and dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center text-gray-500 hover:text-gray-700"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <div className="flex items-center justify-center">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User avatar"
                                    />
                                    <RiArrowDropDownLine />
                                </div>
                            </button>

                            {/* User dropdown */}
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-2 rounded-lg">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Settings
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </a>
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
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700"
                        >
                            Team
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700"
                        >
                            Projects
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700"
                        >
                            Calendar
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
