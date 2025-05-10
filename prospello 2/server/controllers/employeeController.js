   // server/controllers/employeeController.js
   const Employee = require('../models/employee');

   // Create a new employee
   exports.createEmployee = async (req, res) => {
     console.log('Request body:', req.body); // Log the incoming request body
     const { name, email, position, department, salary } = req.body;

     // Validate incoming data
     if (!name || !email || !position || !department || salary === undefined) {
       return res.status(400).json({ message: 'All fields are required.' });
     }

     try {
       // Check for existing employee with the same email
       const existingEmployee = await Employee.findOne({ email });
       if (existingEmployee) {
         return res.status(400).json({ message: 'Employee with this email already exists.' });
       }

       const employee = new Employee(req.body);
       await employee.save();
       res.status(201).json(employee); // Send back the created employee
     } catch (error) {
       console.error('Error saving employee:', error);
       res.status(500).json({ message: 'Error saving employee', error });
     }
   };

   // Get all employees
   exports.getEmployees = async (req, res) => {
     try {
       const employees = await Employee.find();
       res.status(200).json(employees); // Return the list of employees
     } catch (error) {
       console.error('Error fetching employees:', error);
       res.status(500).json({ message: 'Error fetching employees', error });
     }
   };