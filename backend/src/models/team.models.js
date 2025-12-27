// models/team.models.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const Team = sequelize.define('Team', {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true // cite: 22
    }
}, { timestamps: true });