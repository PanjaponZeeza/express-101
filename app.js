import express, { json } from "express";
import { reqLogger } from "./helper/mdw.js";
import dotenv from "dotenv";
const app = express();
const port = 3000;

dotenv.config();

const allowedOrigins = ["http://localhost:2000"]; // Allowed origins
const api = process.env.API || "http://localhost:3000";

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

app.get("/req-get-ping", async (req, res) => {
  try {
    const resp = await fetch(`${api}/ping`, {
      method: "GET",
    });
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/req-post-ping", async (req, res) => {
  try {
    const resp = await fetch(`${api}/post-ping`, {
      method: "POST",
    });
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/req-put-ping", async (req, res) => {
  try {
    const resp = await fetch(`${api}/put-ping`, {
      method: "PUT",
    });
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/req-delete-ping", async (req, res) => {
  try {
    const resp = await fetch(`${api}/delete-ping`, {
      method: "DELETE",
    });
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/req-patch-ping", async (req, res) => {
  try {
    const resp = await fetch(`${api}/patch-ping`, {
      method: "PATCH",
    });
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/api/data", (req, res) => {
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

export default app;
