import express from "express";
import EmployeeController from "../controller/employeeController.js";
const router = express.Router();

router.post("/create", EmployeeController.createEmploye);
router.get("/all", EmployeeController.getEmployees);
router.get("/:id", EmployeeController.getEmployee);
router.put("/:id", EmployeeController.updateEmployeeData);
router.post("/login", EmployeeController.loginEmployee);


export default router;
