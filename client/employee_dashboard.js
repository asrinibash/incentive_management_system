document.addEventListener("DOMContentLoaded", function() {
    // Fetch employee-specific data
    fetchEmployeeData();
});

function fetchEmployeeData() {
    // You need to implement this function to fetch employee-specific data from the server
    // For demonstration purposes, let's assume we receive the data in the following format:
    var employeeData = {
        salesTargets: [
            { month: "2024-01", target: 10000 },
            { month: "2024-02", target: 15000 },
            // Add more sales targets for other months as needed
        ],
        totalSales: 35000 // Total sales achieved by the employee
    };

    // Calculate incentive and holiday package eligibility
    var result = calculateIncentiveAndHolidayPackage(employeeData.totalSales);

    // Update the employee dashboard with fetched data
    updateSalesTargets(employeeData.salesTargets);
    updateIncentives(result.incentive);
    updateHolidayPackageEligibility(result.holidayPackageEligibility);
}

function calculateIncentiveAndHolidayPackage(sales) {
    let incentive = 0;
    let holidayPackageEligibility = false;

    if (sales >= 50000) {
        incentive = sales * 0.05;
        holidayPackageEligibility = true;
    } else if (sales >= 30000) {
        incentive = sales * 0.035 + 1000;
    } else if (sales >= 20000) {
        incentive = sales * 0.03;
    } else if (sales >= 10000) {
        incentive = sales * 0.015;
    }

    return {
        incentive: incentive.toFixed(2),
        holidayPackageEligibility: holidayPackageEligibility
    };
}

function updateIncentives(incentive) {
    document.getElementById("totalIncentives").textContent = "$" + incentive;
}

function updateHolidayPackageEligibility(holidayPackageEligibility) {
    var eligibilityText = holidayPackageEligibility ? "Eligible" : "Not eligible";
    document.getElementById("holidayPackageEligibility").textContent = eligibilityText;
}
