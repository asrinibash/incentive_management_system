
import express from 'express';
import AdminController from '../controller/adminController.js';
const router = express.Router();

router.post("/create",AdminController.createAccount );
router.post("/login",AdminController.login );



export default router;