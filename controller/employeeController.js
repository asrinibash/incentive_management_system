import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class EmployeeController {
  // ** purpose of this method is to create a new employee
  static async createEmploye(request, response) {
    try {
      const { name, email, password } = request.body;
      if (!name || !email || !password) {
        return response
          .status(400)
          .json({ error: "Please provide all the details" });
      }
      const newEmployee = await prisma.employee.create({
        data: {
          name,
          email,
          password,
        },
      });

      return response
        .status(201)
        .json({ message: "Employee created successfully", newEmployee });
    } catch (error) {
      console.log("Error in getEmployee", error.message);
      return response.status(500).json({ error: error.message });
    }
  }

  // *  purpose of this method is to get all the employees

  static async getEmployees(request, response) {
    try {
      const employee = await prisma.employee.findMany();
      return response.status(200).json({ employee });
    } catch (error) {
      console.log("Error in getEmployee", error.message);
      return response.status(500).json({ error: error.message });
    }
  }

  //   * purpose of this method is to get a single employee
  static async getEmployee(request, response) {
    try {
      const { id } = request.params;
      const employee = await prisma.employee.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!employee) {
        return response.status(404).json({ error: "Employee not found" });
      }
      return response.status(200).json({ employee });
    } catch (error) {
      console.log("Error in getEmployee", error.message);
      return response.status(500).json({ error: error.message });
    }
  }

  // * purpose of this method is to update an employee
  static async updateEmployee(request, response) {
    try {
      const { id } = request.params;
      const { name, email, password } = request.body;
      const employee = await prisma.employee.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!employee) {
        return response.status(404).json({ error: "Employee not found" });
      }
      const updatedEmployee = await prisma.employee.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          email,
          password,
        },
      });
      return response
        .status(200)
        .json({ message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
      console.log("Error in updateEmployee", error.message);
      return response.status(500).json({ error: error.message });
    }
  }

  // * purpose of this method is to delete an employee
  static async deleteEmployee(request, response) {
    try {
      const { id } = request.params;
      const employee = await prisma.employee.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!employee) {
        return response.status(404).json({ error: "Employee not found" });
      }
      await prisma.employee.delete({
        where: {
          id: parseInt(id),
        },
      });
      return response
        .status(200)
        .json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.log("Error in deleteEmployee", error.message);
      return response.status(500).json({ error: error.message });
    }
  }

  // ** purpose : update a user profile

  static async updateEmployeeData(request, response) {
    try {
      const { id } = request.params;
      const { targetsales, sales, incentivePercentage } = request.body;
      const employee = await prisma.employee.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!employee) {
        return response.status(404).json({ error: "Employee not found" });
      }
      const updatedEmployee = await prisma.employee.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: employee.name,
          email: employee.email,
          password: employee.password,
          targetsales,
          sales,
          incentivePercentage,
        },
      });

      // calculation for  bonus and incentive

      let updatedBonus = null;
      let updatedHolidays = false;

      if (sales >= updatedEmployee.targetsales) {
        if (updatedEmployee.incentivePercentage == 1.5) {
          updatedBonus = null;
          updatedHolidays = false;
        } else if (updatedEmployee.incentivePercentage == 3) {
          updatedBonus = null;
          updatedHolidays = false;
        } else if (updatedEmployee.incentivePercentage == 3.5) {
          updatedBonus = 1000;
          updatedHolidays = false;
        }
      }

      if (
        updatedEmployee.targetsales >= 50000 &&
        updatedEmployee.incentivePercentage == 5
      ) {
        updatedBonus = null;
        updatedHolidays = true;
      }

      const finalUpdatedData = await prisma.employee.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: employee.name,
          email: employee.email,
          password: employee.password,
          targetsales: updatedEmployee.targetsales,
          sales: updatedEmployee.sales,
          incentivePercentage: updatedEmployee.incentivePercentage,
          bonus: updatedBonus,
          holidayPackage: updatedHolidays,
        },
      });

      return response
        .status(200)
        .json({ message: "Employee updated successfully", finalUpdatedData });
    } catch (error) {
      console.log("Error in updateEmployeeData", error.message);
      return response.status(500).json({ error: error.message });
    }
  }

  //   ** login employee
  static async loginEmployee(request, response) {
    try {
      const { email, password } = request.body;
      const employee = await prisma.employee.findUnique({
        where: {
          email: email,
        },
      });
      const isPasswordMatch = employee.password === password;
      if (!employee || !isPasswordMatch) {
        return response.status(400).json({ error: "Invalid credentials" });
      }
      return response
        .status(200)
        .json({ message: "Login successfull", employee });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export default EmployeeController;
