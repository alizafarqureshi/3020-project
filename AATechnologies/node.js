const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database
let employees = [];

// Routes
app.get('/employees', (req, res) => {
    res.json(employees);
});

app.post('/employees', (req, res) => {
    const { studentId, firstName, lastName, departmentName } = req.body;
    if (!studentId || !firstName || !lastName || !departmentName) {
        return res.status(400).send('All fields are required');
    }
    employees.push({ studentId, firstName, lastName, departmentName });
    res.status(201).send('Employee added successfully');
});

app.put('/employees/:studentId', (req, res) => {
    const { studentId } = req.params;
    const { firstName, lastName, departmentName } = req.body;
    const employeeIndex = employees.findIndex(emp => emp.studentId === studentId);
    if (employeeIndex === -1) {
        return res.status(404).send('Employee not found');
    }
    employees[employeeIndex] = { studentId, firstName, lastName, departmentName };
    res.send('Employee updated successfully');
});

app.delete('/employees/:studentId', (req, res) => {
    const { studentId } = req.params;
    employees = employees.filter(emp => emp.studentId !== studentId);
    res.send('Employee deleted successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
