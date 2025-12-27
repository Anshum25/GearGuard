import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const Request = sequelize.define('Request', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    requestType: { 
        type: DataTypes.ENUM('Corrective', 'Preventive'), 
        allowNull: false 
    }, // cite: 27
    subject: { type: DataTypes.STRING, allowNull: false }, // cite: 31
    scheduledDate: { type: DataTypes.DATE }, // cite: 34
    duration: { type: DataTypes.FLOAT, defaultValue: 0 }, // cite: 35
    hoursUpdate: { type: DataTypes.FLOAT, defaultValue: 0 }, // cite: 45
    stage: { 
        type: DataTypes.ENUM('New', 'In Progress', 'Repaired', 'Scrap'), 
        defaultValue: 'New' 
    } // cite: 42, 55
}, { 
    timestamps: true,
    hooks: {
        // Scrap Logic automation cite: 76
        afterUpdate: async (request) => {
            if (request.stage === 'Scrap') {
                const equipment = await request.getEquipment();
                if (equipment) await equipment.update({ isUsable: false });
            }
        }
    }
});