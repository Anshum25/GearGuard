import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const MaintenanceRequest = sequelize.define('MaintenanceRequest', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    subject: { type: DataTypes.STRING, allowNull: false }, // cite: 31
    requestType: { 
        type: DataTypes.ENUM('CORRECTIVE', 'PREVENTIVE'), 
        allowNull: false 
    }, // cite: 27
    stage: { 
        type: DataTypes.ENUM('NEW', 'IN_PROGRESS', 'REPAIRED', 'SCRAP'), 
        defaultValue: 'NEW' 
    }, // cite: 55
    scheduledDate: { type: DataTypes.DATE }, // cite: 34
    durationHours: { type: DataTypes.FLOAT, defaultValue: 0 }, // cite: 35
    isOverdue: { 
        type: DataTypes.VIRTUAL,
        get() {
            return this.scheduledDate < new Date() && this.stage !== 'REPAIRED';
        } 
    } // cite: 60
}, { 
    timestamps: true,
    hooks: {
        // Automation: If request moved to SCRAP, mark Equipment as SCRAPPED 
        afterUpdate: async (request) => {
            if (request.stage === 'SCRAP') {
                const equipment = await request.getEquipment();
                if (equipment) {
                    await equipment.update({ status: 'SCRAPPED' });
                }
            }
        }
    }
});