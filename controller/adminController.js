import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class AdminController {
  // ** purpose of this method is to create a new admin

  static async createAccount(request, response) {
    try {
      const { name, email, password } = request.body;
      if (!email || !password) {
        return response
          .status(400)
          .json({ error: "Please provide all the details" });
      }
      const newAdmin = await prisma.admin.create({
        data: {
          name,
          email,
          password,
        },
      });
      return response
        .status(201)
        .json({ message: "Admin created successfully", newAdmin });
    } catch (error) {
      console.log("Error in createAccount", error.message);
      return response.status(500).json({ error: error.message });
    }
  }

  //   * purpose of this method is to login an admin

  static async login(request, response) {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        return response
          .status(400)
          .json({ error: "Please provide all the details" });
      }
      const admin = await prisma.admin.findUnique({
        where: {
          email: email,
        },
      });
      if (!admin) {
        return response.status(404).json({ error: "Admin not found" });
      }
      if (admin.password !== password) {
        return response.status(401).json({ error: "Invalid credentials" });
      }
      return response
        .status(200)
        .json({ message: "Admin logged in successfully" });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export default AdminController;
