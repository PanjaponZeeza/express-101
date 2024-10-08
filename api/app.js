import express, { json } from "express";
import { PrismaClient } from "@prisma/client";
import { reqLogger } from "./../helper/mdw.js";
const app = express();

const prisma = new PrismaClient();

const allowedOrigins = ["http://localhost:2000"]; // Allowed origins

// Enable CORS for all routes (standard settings)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:2000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(json());
app.use(reqLogger);

// Sample API endpoints
app.get("/ping", (req, res) => {
  res.json({ message: "Hello from API!" });
});

app.all("/api/data", (req, res) => {
  res.json({ received: req.body });
});

app.post("/api/user/create", async (req, res) => {
  const { name, email } = req.body;

  // Equivalent to: INSERT INTO User (name, email) VALUES ('name', 'email');
  const newUser = await prisma.user.create({
    data: { name, email },
  });

  if (!newUser) {
    return res.status(400).json({ error: "User not created." });
  }
  return res
    .status(200)
    .json({ result: `User name ${name}, email ${email} had created.` });
});

export default app;
