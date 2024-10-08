import express, { json } from "express";
import { reqLogger } from "./helper/mdw.js";
const app = express();
const port = 3000;

const allowedOrigins = ["http://localhost:2000"]; // Allowed origins

// Enable CORS for all routes (standard settings)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "origin");
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

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

export default app;