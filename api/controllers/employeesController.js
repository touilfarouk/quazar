import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadEmployees = async () => {
  try {
    const employeesData = await readFile(join(__dirname, '../model/employees.json'), 'utf8');
    return JSON.parse(employeesData);
  } catch (error) {
    return [];
  }
};

const saveEmployees = async (employees) => {
  try {
    await writeFile(join(__dirname, '../model/employees.json'), JSON.stringify(employees, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving employees:', error);
    return false;
  }
};

const data = {
    employees: [],
    setEmployees: function (newData) { this.employees = newData; }
}

const getAllEmployees = async (req, res) => {
    data.employees = await loadEmployees();
    res.json(data.employees);
}






const createNewEmployee = async (req, res) => {
    data.employees = await loadEmployees();
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setEmployees([...data.employees, newEmployee]);
    await saveEmployees(data.employees);
    res.status(201).json(data.employees);
}

const updateEmployee = async (req, res) => {
    data.employees = await loadEmployees();
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    await saveEmployees(data.employees);
    res.json(data.employees);
}

const deleteEmployee = async (req, res) => {
    data.employees = await loadEmployees();
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    await saveEmployees(data.employees);
    res.json(data.employees);
}

const getEmployee = async (req, res) => {
    data.employees = await loadEmployees();
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

export { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee };
