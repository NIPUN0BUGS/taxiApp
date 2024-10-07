const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const createDriversTable = require('./tables/Drivers');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taxidb'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');

    // Create drivers table on startup
    createDriversTable(db);
});

// Endpoint to get a simple response
app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
