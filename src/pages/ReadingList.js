import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashNav from '../components/DashNav';
import { Helmet } from 'react-helmet-async'
import { HiOutlineTrash } from 'react-icons/hi';
import { IoMdAddCircle } from 'react-icons/io';

const ReadingList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestedBooks, setSuggestedBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [readingList, setReadingList] = useState(() => {
        const savedList = localStorage.getItem('readingList');
        return savedList ? JSON.parse(savedList) : [];
    });

    // Fetch book suggestions from Google Books API
    const fetchSuggestions = async (term) => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=10`
            );
            setSuggestedBooks(response.data.items || []);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // Handle search input
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term) {
            fetchSuggestions(term);
        } else {
            setSuggestedBooks([]);
        }
    };

    // Handle book selection
    const handleSelectBook = (book) => {
        setSelectedBooks((prevSelected) => {
            if (prevSelected.includes(book)) {
                return prevSelected.filter((b) => b.id !== book.id);
            } else {
                return [...prevSelected, book];
            }
        });
    };
    const handleDelete = (id) => {
        // Remove the book from the local storage
        const storedReadingList = JSON.parse(localStorage.getItem('readingList')) || [];
        const updatedList = storedReadingList.filter(book => book.id !== id);
        localStorage.setItem('readingList', JSON.stringify(updatedList));

        // Remove the book from the state
        setReadingList(prevList => prevList.filter(book => book.id !== id));
    };
    // Add selected books to reading list
    const handleAddBooks = () => {
        const updatedList = [...selectedBooks.map((book) => ({
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors?.join(', ') || 'Unknown Author',
            description: book.volumeInfo.description ? book.volumeInfo.description : 'No description available',
            cover: book.volumeInfo.imageLinks?.thumbnail,
            link: book.volumeInfo.previewLink,
            date: '',
            pageNumber: ''
        })), ...readingList];
        setReadingList(updatedList);
        setSelectedBooks([]);
        setSuggestedBooks([]);
        setSearchTerm('');
        localStorage.setItem('readingList', JSON.stringify(updatedList));
    };

    // Update reading list entry in local storage
    const updateReadingList = (updatedList) => {
        setReadingList(updatedList);
        localStorage.setItem('readingList', JSON.stringify(updatedList));
    };

    // Handle date or page number change
    const handleInputChange = (id, field, value) => {
        const updatedList = readingList.map((book) =>
            book.id === id ? { ...book, [field]: value } : book
        );
        updateReadingList(updatedList);
    };

    // Handle fade-out effect for checked books
    const toggleFade = (id) => {
        const updatedList = readingList.map((book) =>
            book.id === id ? { ...book, faded: !book.faded } : book
        );
        updateReadingList(updatedList);
    };

    return (
        <div className="max-w-screen-xl	mx-auto font-inter">
            <Helmet>
                <title>TaskFlow</title>
            </Helmet>
            <DashNav />
            <div className="container content-center mx-auto p-4">
                {/* Search box and Add button */}
                <div className="flex items-center justify-center mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search for a book..."
                        className="w-1/2 p-3 border border-black border-2 rounded-md"
                    />
                    <button
                        onClick={handleAddBooks}
                        className="ml-4 px-2 text-3xl py-2 bg-black text-white rounded-md"
                    >
                        <IoMdAddCircle className='' />
                    </button>
                </div>

                {/* Suggested books dropdown */}
                {suggestedBooks.length > 0 && (
                    <div className="mb-4 w-1/2 mx-auto border border-gray-300 rounded-lg p-2">
                        {suggestedBooks.map((book) => (
                            <div key={book.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        
                                        checked={selectedBooks.includes(book)}
                                        onChange={() => handleSelectBook(book)}
                                        className="mr-2 accent-black"
                                    />
                                    <span>{book.volumeInfo.title} by {book.volumeInfo.authors?.join(', ')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Reading list */}
                <div className="space-y-4">
                    {readingList.map((book) => (
                        <div
                            key={book.id}
                            className={`flex  ${book.faded ? 'bg-green-300' : 'opacity-100'} flex-col md:flex-row items-start md:items-center w-full px-4 py-2 bg-white shadow-md rounded-md ${book.faded ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
                        >
                            {/* Book Cover */}
                            <div className="relative">
                                <img
                                    src={book.cover || 'https://www.scottishpoetrylibrary.org.uk/wp-content/uploads/2018/05/SnipImage_6-480x360.jpg'}
                                    alt={book.title}
                                    className="w-24 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
                                />

                                <a
                                    href={book.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute mb-4 font-sm md:mb-0 md:mr-4 inset-0 text-4xl flex items-center justify-center hover:bg-gray-300 opacity-0 text-black  rounded-md  hover:opacity-70"
                                >
                                    Read Now
                                </a>
                            </div>
                            {/* Book Details */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1 break-words">{book.title.length > 50 ? `${book.title.slice(0, 50)}...` : book.title}</h3>
                                <p className="text-sm text-gray-600 mb-1 break-words">Author: {book.authors}</p>
                                <p className="text-sm text-gray-600 mb-2 break-words">Description: {book.description.length > 100 ? `${book.description.slice(0, 100)}...` : book.description}</p>
                                <div className="flex  mb-2">
                                    <input
                                        type="date"
                                        placeholder="Date"
                                        value={book.date}
                                        onChange={(e) => handleInputChange(book.id, 'date', e.target.value)}
                                        className="w-full mr-2 md:w-1/4 p-2 border border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Page Number"
                                        value={book.pageNumber}
                                        onChange={(e) => handleInputChange(book.id, 'pageNumber', e.target.value)}
                                        className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        checked={book.faded}
                                        onChange={() => toggleFade(book.id)}
                                        className="form-checkbox h-5 w-5 text-blue-600 accent-black"
                                    />
                                    <label htmlFor={`checkbox-${book.id}`} className="ml-2">Mark as Read</label>
                                </div>
                            </div>
                            {/* Buttons on the right side */}
                            {/* <div className="flex"> */}
                            {/* Read Now Button */}
        
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(book.id)}
                                title="Delete Book"
                                className="bg-black text-2xl cursor-pointer text-white py-2 px-2 rounded-md  hover:bg-gray-800"
                            >
                                <HiOutlineTrash />
                            </button>
                            {/* </div> */}
                        </div>

                    ))}
                </div>

            </div>
        </div>
    );
};

export default ReadingList;
