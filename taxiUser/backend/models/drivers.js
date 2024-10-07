module.exports = (sequelize, DataTypes) => {

    const driver = sequelize.define("Drivers", {
        driverName:{
            type: DataTypes.VARCHAR,
            allowNull: false
        },
        driverPhone:{
            type: DataTypes.VARCHAR,
            allowNull: false
        },
        vehicleColor:{
            type: DataTypes.VARCHAR,
            allowNull: false
        },
        vehicleLicencePlate:{
            type: DataTypes.VARCHAR,
            allowNull: false
        },
        driverLocation:{
            type: DataTypes.VARCHAR,
            allowNull: false
        },
        driverAvailability:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    return driver;
}