import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import '../App.css'; // Import your app.css file here

const DriverForm = () => {
  const [driver, setDriver] = useState({
    driverName: '',
    driverPhone: '',
    vehicleColor: '',
    vehicleLicencePlate: '',
    driverLocation: '',
    driverAvailability: true,
  });

  const [drivers, setDrivers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const response = await axios.get('http://localhost:8081/drivers'); // Your API endpoint
    setDrivers(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver({ ...driver, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!driver.driverName || !driver.driverPhone || !driver.vehicleLicencePlate || !driver.driverLocation) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setErrorMessage(''); // Clear the error message

    if (editingId) {
      await axios.put(`http://localhost:8081/drivers/${editingId}`, driver);
    } else {
      await axios.post('http://localhost:8081/drivers', driver);
    }

    setDriver({
      driverName: '',
      driverPhone: '',
      vehicleColor: '',
      vehicleLicencePlate: '',
      driverLocation: '',
      driverAvailability: true,
    });
    setEditingId(null);
    fetchDrivers();
  };

  const handleEdit = (driver) => {
    setDriver(driver);
    setEditingId(driver.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this driver?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:8081/drivers/${id}`);
      fetchDrivers();
    }
  };

  return (
    <div className="driverTableContainer">
      <Container>
        <Typography variant="h4" gutterBottom>
          Driver Management
        </Typography>
        <TableContainer component={Paper} className="driverTable driverTableBorder">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Driver Name</TableCell>
                <TableCell>Driver Phone</TableCell>
                <TableCell>Vehicle License Plate</TableCell>
                <TableCell>Driver Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Form Row */}
              <TableRow>
                <TableCell>
                  <TextField
                    label="Driver Name"
                    name="driverName"
                    value={driver.driverName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Driver Phone"
                    name="driverPhone"
                    value={driver.driverPhone}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Vehicle Licence Plate"
                    name="vehicleLicencePlate"
                    value={driver.vehicleLicencePlate}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id="driverLocation-label">Driver Location</InputLabel>
                    <Select
                    className="driverLocation"
                      labelId="driverLocation-label"
                      id="driverLocation"
                      name="driverLocation"
                      value={driver.driverLocation}
                      onChange={handleChange}
                      label="Driver Location"
                      fullWidth
                      required
                    >
                      <MenuItem value="Location A">Location A</MenuItem>
                      <MenuItem value="Location B">Location B</MenuItem>
                      <MenuItem value="Location C">Location C</MenuItem>
                      <MenuItem value="Location D">Location D</MenuItem>
                      <MenuItem value="Location E">Location E</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    {editingId ? 'Update Driver' : 'Add Driver'}
                  </Button>
                </TableCell>
              </TableRow>
              {/* Error Message Row */}
              {errorMessage && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography color="error">{errorMessage}</Typography>
                  </TableCell>
                </TableRow>
              )}
              {/* Driver List Rows */}
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.driverName}</TableCell>
                  <TableCell>{driver.driverPhone}</TableCell>
                  <TableCell>{driver.vehicleLicencePlate}</TableCell>
                  <TableCell>{driver.driverLocation}</TableCell>
                  <TableCell>
                    <Button className="editBtn" variant="outlined" onClick={() => handleEdit(driver)}>Edit</Button>
                    <Button className="deleteBtn" variant="outlined" color="secondary" onClick={() => handleDelete(driver.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default DriverForm;
