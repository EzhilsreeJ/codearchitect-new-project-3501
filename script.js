document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const employeeTableBody = document.querySelector('#employeeTable tbody');

    let employees = [];

    // Function to render employees in the table
    function renderEmployees() {
        employeeTableBody.innerHTML = ''; // Clear existing rows

        employees.forEach((employee, index) => {
            const row = employeeTableBody.insertRow();

            row.insertCell().textContent = employee.name;
            row.insertCell().textContent = employee.position;
            row.insertCell().textContent = `$${employee.salary.toLocaleString()}`;

            const actionsCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => deleteEmployee(index));
            actionsCell.appendChild(deleteButton);
        });
    }

    // Function to add a new employee
    employeeForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const nameInput = document.getElementById('name');
        const positionInput = document.getElementById('position');
        const salaryInput = document.getElementById('salary');

        const newEmployee = {
            name: nameInput.value,
            position: positionInput.value,
            salary: parseFloat(salaryInput.value)
        };

        if (newEmployee.name && newEmployee.position && !isNaN(newEmployee.salary) && newEmployee.salary >= 0) {
            employees.push(newEmployee);
            renderEmployees(); // Update the table

            // Clear the form
            nameInput.value = '';
            positionInput.value = '';
            salaryInput.value = '';
        } else {
            alert('Please fill in all fields correctly (Salary must be a non-negative number).');
        }
    });

    // Function to delete an employee
    function deleteEmployee(index) {
        if (confirm('Are you sure you want to delete this employee?')) {
            employees.splice(index, 1); // Remove employee from array
            renderEmployees(); // Update the table
        }
    }

    // Initial render (useful if employees were loaded from local storage, etc.)
    renderEmployees();
});