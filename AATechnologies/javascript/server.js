import express from 'express';
import mysql from'mysql';
import bodyParser from 'body-parser';
import cors from'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.json({ limit: "50mb" }));  // JSON requests
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Form data

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change as needed
  password: "123456", // Change as needed
  database: "AATechnologies_db"
});

db.connect((err) => {
    if (err) {
    console.log("Failed connection")
    }
    console.log("Connected to database");
});

app.get("/", (req, res) => {
  res.json("hello");
});

db.query(
  `CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(255),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table created or already exists");
  } 
);

db.query(
  `CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table created or already exists");
  }
);

db.query(
  `CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  (err, result) => {
    if (err) throw err;
    console.log("Services table created or already exists");
  }
);

// Route to handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !phone || !service|| !message ) {
    console.log("Error: Missing fields", req.body);
    return res.status(400).json({ error: "Everything needs to be filled in" });
  }

  const Queryuery = 'INSERT INTO contacts (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, phone, service, message], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Form successfully sent." });
  });
});

// Add a new service
app.post("/add-service", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: "All fields required" });

  const query = "INSERT INTO services (title, description) VALUES (?, ?)";
  db.query(query, [title, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Service added successfully!" });
  });
});

app.post("/add-project", (req, res) => {
  const { title, image } = req.body;
  if (!title || !image) return res.status(400).json({ error: "All fields required" });

  const query = "INSERT INTO projects (title, image) VALUES (?, ?)";
  db.query(query, [title, image], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Project added successfully!" });
  });
});

// Fetch all services
app.get("/services", (req, res) => {
  db.query("SELECT * FROM services", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Fetch all projects
app.get("/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));