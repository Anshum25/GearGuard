// models/department.models.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const Department = sequelize.define('Department', {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true // cite: 11
    }
}, { timestamps: true });