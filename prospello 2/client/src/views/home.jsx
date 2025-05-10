import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { FaUserPlus } from 'react-icons/fa'; // Importing an icon for the add button

function Home() {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        position: '',
        department: '',
        salary: 0,
    });

    // Fetch employees from the server
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/employees');
                console.log('Fetched employees:', response); 
                // Ensure the response data is an array
                setEmployees(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setEmployees([]); // Set to empty array on error
            }
        };

        fetchEmployees();
    }, []);

    const addEmployee = async () => {
        if (newEmployee.name && newEmployee.position && newEmployee.department && newEmployee.salary) {
            try {
                console.log('Adding employee:', newEmployee);
                const response = await axios.post('http://localhost:3000/api/employees', newEmployee);
                setEmployees([...employees, response.data]); // Add the new employee to the state
                setNewEmployee({
                    name: '',
                    position: '',
                    department: '',
                    salary: 0,
                }); // Reset input fields
            } catch (error) {
                console.error('Error adding employee:', error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <>
            <div className='w-full min-h-screen h-auto p-5 bg-gray-100'>
                <div className='w-4/5 mx-auto bg-white shadow-lg rounded-lg p-8'>
                    <h1 className='text-4xl font-bold text-center mb-8 text-blue-600'>HR Management System</h1>
                    
                    <div className='mb-8'>
                        <h2 className='text-3xl font-semibold mb-4'>Add New Employee</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input
                                type='text'
                                placeholder='Name'
                                value={newEmployee.name}
                                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                                className='border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='text'
                                placeholder='Position'
                                value={newEmployee.position}
                                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                                className='border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='email'
                                placeholder='Email'
                                value={newEmployee.email}
                                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                                className='border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='text'
                                placeholder='Department'
                                value={newEmployee.department}
                                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                                className='border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        
                         
                            <input
                                type='number'
                                placeholder='Salary'
                                value={newEmployee.salary}
                                onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                                className='border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <button
                                onClick={addEmployee}
                                className='bg-blue-600 text-white p-4 rounded-md mt-2 flex items-center justify-center hover:bg-blue-700 transition duration-200'
                            >
                                <FaUserPlus className='mr-2' /> Add Employee
                            </button>
                        </div>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='border-b-2 border-gray-300 p-4 text-left'>Name</th>
                                    <th className='border-b-2 border-gray-300 p-4 text-left'>Position</th>
                                    <th className='border-b-2 border-gray-300 p-4 text-left'>Department</th>
                                    <th className='border-b-2 border-gray-300 p-4 text-left'>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 ? (
                                    employees.map((employee, index) => (
                                        <tr key={index} className='hover:bg-gray-100 transition duration-200'>
                                            <td className='border-b border-gray-300 p-4'>{employee.name}</td>
                                            <td className='border-b border-gray-300 p-4'>{employee.position}</td>
                                            <td className='border-b border-gray-300 p-4'>{employee.department}</td>
                                            <td className='border-b border-gray-300 p-4'>{employee.salary}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='4' className='text-center p-4'>No employees added yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;