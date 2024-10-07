const express = require("express");
const { PrismaClient } = require("@prisma/client");
const reqLogger = require("./helper/mdw");
const app = express();
const port = 3000;

const prisma = new PrismaClient();

const allowedOrigins = ["http://whatever-domain-is.com"]; // Allowed origins

// Enable CORS for all routes (standard settings)
app.use((req, res, next) => {
  // for (const origin of allowedOrigins) {
  //   res.header("Access-Control-Allow-Origin", origin);
  // }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
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

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
