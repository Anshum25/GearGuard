import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const MaintenanceTeam = sequelize.define('MaintenanceTeam', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    teamName: { type: DataTypes.STRING, allowNull: false, unique: true } // cite: 22
}, { timestamps: true });