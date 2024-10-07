const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password
    database: 'taxidb', // Your database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//basic crud opr

// Create a driver
app.post('/drivers', (req, res) => {
    const { driverName, driverPhone, vehicleColor, vehicleLicencePlate, driverLocation, driverAvailability } = req.body;
    const sql = 'INSERT INTO drivers (driverName, driverPhone, vehicleColor, vehicleLicencePlate, driverLocation, driverAvailability) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [driverName, driverPhone, vehicleColor, vehicleLicencePlate, driverLocation, driverAvailability], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json({ id: result.insertId, ...req.body });
    });
});

// Get all drivers
app.get('/drivers', (req, res) => {
    db.query('SELECT * FROM drivers', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// Update a driver
app.put('/drivers/:id', (req, res) => {
    const { id } = req.params;
    const { driverName, driverPhone, vehicleColor, vehicleLicencePlate, driverLocation, driverAvailability } = req.body;
    const sql = 'UPDATE drivers SET driverName = ?, driverPhone = ?, vehicleColor = ?, vehicleLicencePlate = ?, driverLocation = ?, driverAvailability = ? WHERE id = ?';
    db.query(sql, [driverName, driverPhone, vehicleColor, vehicleLicencePlate, driverLocation, driverAvailability, id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ id, ...req.body });
    });
});

// Delete a driver
app.delete('/drivers/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM drivers WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(204).send();
    });
});
