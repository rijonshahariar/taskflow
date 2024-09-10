
import React, { useState, useEffect } from 'react';
import { CgAddR } from 'react-icons/cg';
import { FaRegEdit } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { RiDeleteBack2Line, RiDeleteBin2Line } from 'react-icons/ri';

// Main component
export default function TaskTable() {
    const [tables, setTables] = useState(() => {
        const savedTables = localStorage.getItem('tables');
        return savedTables ? JSON.parse(savedTables) : [];
    });

    useEffect(() => {
        const savedTables = JSON.parse(localStorage.getItem('tables')) || [];
        if (savedTables.length === 0) {
            const newTable = { name: 'New Table', rows: [{ taskName: '', assignee: '', due: '', isSelected: false }] };
            setTables([newTable]);
            localStorage.setItem('tables', JSON.stringify([newTable]));
        } else {
            setTables(savedTables);
        }
    }, []);

    // Save data to localStorage whenever 'tables' changes
    useEffect(() => {
        localStorage.setItem('tables', JSON.stringify(tables));
    }, [tables]);

    // Add a new empty table
    const [tableName, setTableName] = useState('');

    const handleAddNewTable = () => {

        const newTable = {
            id: tables.length + 1,
            name: "New Table",
            rows: [{ taskName: '', assignee: '', due: '', isSelected: false }],
        };

        setTables([...tables, newTable]);
        setTableName(''); // Clear input after adding the table
    };


    // Handle updating a cell value
    const handleCellChange = (tableId, rowIndex, field, value) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                const updatedRows = table.rows.map((row, idx) => {
                    if (idx === rowIndex) {
                        return { ...row, [field]: value };
                    }
                    return row;
                });
                return { ...table, rows: updatedRows };
            }
            return table;
        });
        setTables(updatedTables);
    };

    // Toggle row selection (fade effect)
    const handleSelectRow = (tableId, rowIndex) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                const updatedRows = table.rows.map((row, idx) => {
                    if (idx === rowIndex) {
                        return { ...row, isSelected: !row.isSelected };
                    }
                    return row;
                });
                return { ...table, rows: updatedRows };
            }
            return table;
        });
        setTables(updatedTables);
    };

    // Delete row from table
    const handleDeleteRow = (tableId, rowIndex) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                const updatedRows = table.rows.filter((_, idx) => idx !== rowIndex);
                return { ...table, rows: updatedRows };
            }
            return table;
        });
        setTables(updatedTables);
    };

    // Add a new row to the specific table
    const handleAddNewRow = (tableId) => {
        const updatedTables = tables.map((table) => {
            if (table.id === tableId) {
                return {
                    ...table,
                    rows: [...table.rows, { taskName: '', assignee: '', due: '', isSelected: false }],
                };
            }
            return table;
        });
        setTables(updatedTables);
    };

    // Delete the entire table
    const handleDeleteTable = (tableId) => {
        const updatedTables = tables.filter((table) => table.id !== tableId);
        setTables(updatedTables);
    };

    const addRow = (tableIndex) => {
        const newTables = [...tables];
        newTables[tableIndex].rows.push({ id: Date.now(), content: '' });
        setTables(newTables);
    };

    const updateRow = (tableIndex, rowIndex, content) => {
        const newTables = [...tables];
        newTables[tableIndex].rows[rowIndex].content = content;
        setTables(newTables);
    };

    const [isEditing, setIsEditing] = useState(null); // To keep track of which table's name is being edited

    const handleNameChange = (tableIndex, newName) => {
        const updatedTables = [...tables];
        updatedTables[tableIndex].name = newName;
        setTables(updatedTables);
    };

    return (
        <div className="p-4">

            <div class="fixed bottom-0 right-0 p-4">
                <button class="bg-gray-800 hover:bg-gray-900 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center" onClick={handleAddNewTable}>
                    <IoAdd />
                </button>
            </div>

            {/* Render all tables */}
            {tables.map((table, tableIndex) => (

                <div key={table.id} className="mb-6">
                    {isEditing === tableIndex ? (

                        <div className='flex item-center justify-center'>
                            <input
                                type="text"
                                value={table.name}
                                onChange={(e) =>
                                    handleNameChange(tableIndex, e.target.value)
                                }
                                onBlur={() => setIsEditing(null)} // Save and stop editing on blur
                                autoFocus
                                className="p-2 font-semibold text-xl outline-none border-b-2 border-black"
                            />
                        </div>

                    ) : (
                        <div className='flex item-center justify-center'>
                            <th colSpan="100%" className="border-b-4 w-full text-center text-xl p-2 font-semibold">
                                <button
                                    title="Delete Table"
                                    className="text-red-500 text-2xl hover:text-red-800 mr-2"
                                    onClick={() => handleDeleteTable(table.id)}
                                >
                                    <RiDeleteBin2Line />
                                </button>
                                {table.name}
                                <button
                                    onClick={() => setIsEditing(tableIndex)} // Start editing
                                    className="ml-2 text-gray-500"
                                >
                                    <FaRegEdit />
                                </button>
                            </th>
                        </div>
                    )}
                    <table className="table-fixed min-w-full border-collapse border-gray-300">
                        <thead>


                            <tr>

                            </tr>
                            <tr className="">
                                <th className="px-2 py-2"></th>
                                <th className="px-4 py-2">Task Title</th>
                                <th className="px-4 border-x py-2">Description</th>
                                <th className="px-4 py-2">Due Date</th>
                                <th className="px-2 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className={row.isSelected ? 'bg-gray-100' : ''}>
                                    <td className=" px-2 py-2 text-center">
                                        <input
                                            className="h-5 w-5 cursor-pointer rounded shadow hover:shadow-md border border-slate-300 checked:bg-black accent-black"
                                            type="checkbox"
                                            checked={row.isSelected}

                                            onChange={() => handleSelectRow(table.id, rowIndex)}
                                        />

                                    </td>
                                    <td className="border w-1/4 p-1">
                                        <input
                                            type="text"
                                            value={row.taskName}
                                            onChange={(e) =>
                                                handleCellChange(table.id, rowIndex, 'taskName', e.target.value)
                                            }
                                            className={`w-full text-sm p-2 ${row.isSelected ? 'opacity-50' : ''}`}
                                            placeholder="Enter task"
                                            disabled={row.isSelected}
                                        />
                                    </td>
                                    <td className="border p-1">
                                        <textarea
                                            type="text"
                                            rows="1"
                                            value={row.assignee}
                                            onChange={(e) =>
                                                handleCellChange(table.id, rowIndex, 'assignee', e.target.value)
                                            }
                                            className={`w-full text-sm p-2  ${row.isSelected ? 'opacity-50' : ''}`}
                                            placeholder="Add description"
                                            disabled={row.isSelected}
                                        />
                                    </td>
                                    <td className="border w-1/12 p-1">
                                        <input
                                            type="date"
                                            value={row.due}
                                            onChange={(e) =>
                                                handleCellChange(table.id, rowIndex, 'due', e.target.value)
                                            }
                                            className={`w-full text-sm p-2 ${row.isSelected ? 'opacity-50' : ''}`}
                                            disabled={row.isSelected}
                                        />
                                    </td>
                                    <td className="p-1 text-center">
                                        <button
                                            className="text-black px-2 py-2 text-2xl rounded hover:text-gray-500"
                                            onClick={() => handleDeleteRow(table.id, rowIndex)}
                                        >
                                            <RiDeleteBack2Line />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Add new row button */}
                    <button
                        title="Add Row"
                        className="text-3xl text-black hover:text-gray-500 rounded mt-2"
                        onClick={() => handleAddNewRow(table.id)}
                    >
                        <CgAddR />
                    </button>

                    {/* Delete table button */}

                </div>
            ))}
        </div>
    );
}
