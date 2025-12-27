import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const Equipment = sequelize.define('Equipment', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    serialNumber: { type: DataTypes.STRING, allowNull: false, unique: true }, // cite: 16
    name: { type: DataTypes.STRING, allowNull: false }, // cite: 16
    warrantyPeriod: { type: DataTypes.INTEGER }, // Stored as months cite: 17
    purchaseDate: { type: DataTypes.DATE }, // cite: 17
    location: { type: DataTypes.STRING }, // cite: 18
    ownerType: { 
        type: DataTypes.ENUM('Department', 'Employee'), 
        allowNull: false 
    }, // cite: 11
    ownerId: { type: DataTypes.STRING, allowNull: false }, // Name/ID of Dept or Employee cite: 11
    isUsable: { type: DataTypes.BOOLEAN, defaultValue: true } // cite: 76
}, { timestamps: true });