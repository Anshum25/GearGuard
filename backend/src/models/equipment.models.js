// models/equipment.models.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Equipment = sequelize.define('Equipment', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false }, // cite: 16
    serialNumber: { type: DataTypes.STRING, allowNull: false, unique: true }, // cite: 16
    purchaseDate: { type: DataTypes.DATE }, // cite: 17
    warrantyExpiration: { type: DataTypes.DATE }, // cite: 17
    location: { type: DataTypes.STRING }, // cite: 18
    status: { 
        type: DataTypes.ENUM('OPERATIONAL', 'MAINTENANCE', 'SCRAPPED'), 
        defaultValue: 'OPERATIONAL' // cite: 76
    }
}, { timestamps: true });

export { Equipment };