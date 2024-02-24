document.addEventListener("DOMContentLoaded", function() {
    // Fetch employee data and populate the table
    fetchEmployeeData();
    
    // Add event listener for form submission
    document.getElementById("addEmployeeForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        
        var username = document.getElementById("employeeUsername").value;
        var password = document.getElementById("employeePassword").value;
        
        // Validate input fields (you can add more validation as needed)
        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter both username and password");
            return;
        }
        
        // Send data to server to add new employee
        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        
        fetch("http://localhost:8000/api/emp/create", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If employee added successfully, refresh the employee list
                fetchEmployeeData();
                // Clear form fields
                document.getElementById("employeeUsername").value = "";
                document.getElementById("employeePassword").value = "";
            } else {
                alert("Failed to add employee");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while adding employee");
        });
    });
});

function fetchEmployeeData() {
    // Fetch employee data from server
    fetch("http://localhost:8000/api/emp/all")
    .then(response => response.json())
    .then(data => {
        // Clear previous data from table
        var tableBody = document.getElementById("employeeTableBody");
        tableBody.innerHTML = "";
        
        // Populate table with employee data
        data.forEach(function(employee) {
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.username}</td>
                <td><button onclick="deleteEmployee(${employee.id})">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while fetching employee data");
    });
}

function deleteEmployee(employeeId) {
    // Send request to server to delete employee
    fetch("http://localhost:8000/api/emp/{id}", {
        method: "POST",
        body: JSON.stringify({ id: employeeId }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // If employee deleted successfully, refresh the employee list
            fetchEmployeeData();
        } else {
            alert("Failed to delete employee");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while deleting employee");
    });
}

document.getElementById("addSalesTargetForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    var employeeId = document.getElementById("employeeId").value;
    var month = document.getElementById("month").value;
    var salesTarget = document.getElementById("salesTarget").value;
    
    // Validate input fields
    if (employeeId.trim() === "" || month.trim() === "" || salesTarget.trim() === "") {
        alert("Please fill in all fields");
        return;
    }
    
    // Send data to server to add sales target
    var formData = new FormData();
    formData.append("employeeId", employeeId);
    formData.append("month", month);
    formData.append("salesTarget", salesTarget);
    
    fetch("http://localhost:8000/api/emp/{id}", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Sales target added successfully");
            // Clear form fields
            document.getElementById("employeeId").value = "";
            document.getElementById("month").value = "";
            document.getElementById("salesTarget").value = "";
        } else {
            alert("Failed to add sales target");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while adding sales target");
    });
});
