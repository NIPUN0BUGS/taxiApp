const createDriversTable = (db) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS drivers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        driverName VARCHAR(100) NOT NULL,
        driverPhone VARCHAR(15) NOT NULL,
        vehicleColor VARCHAR(50),
        vehicleLicencePlate VARCHAR(20) NOT NULL,
        driverLocation VARCHAR(100),
        driverAvailability BOOLEAN DEFAULT TRUE
      )
    `;
  
    db.query(createTableQuery, (err, result) => {
      if (err) {
        console.error('Error creating drivers table:', err);
        throw err; // You can handle the error as needed
      }
      console.log('Drivers table created successfully');
    });
  };
  
  module.exports = createDriversTable;
  