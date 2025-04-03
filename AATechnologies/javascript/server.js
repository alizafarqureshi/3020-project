import express from 'express';
import mysql from'mysql';
import bodyParser from 'body-parser';
import cors from'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change as needed
  password: "123456", // Change as needed
  database: "contact_form_db",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
});

app.get("/", (req, res) => {
  res.json("hello");
});

// Route to handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !phone || !service|| !message ) {
    console.log("Error: Missing fields", req.body);
    return res.status(400).json({ error: "Everything needs to be filled in" });
  }

  const query = 'INSERT INTO contacts (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, phone, service, message], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Form successfully sent." });
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
