import express from 'express';
import bodyParser from 'body-parser';
import employeeRoutes from './routes/employeeRoutes.js';
import AdminController from './controller/adminController.js';
import adminRoutes from "./routes/adminRoutes.js"

const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use("/api/emp",employeeRoutes);
app.use("/api/admin",adminRoutes);


app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})

