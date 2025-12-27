// models/index.js
import { User } from "./user.models.js";
import { Equipment } from "./equipment.models.js";
import { MaintenanceTeam } from "./team.models.js";
import { MaintenanceRequest } from "./maintenancerequest.models.js";
import { Department } from "./department.models.js"; // New Import

// --- OWNERSHIP ASSOCIATIONS ---

// Equipment belongs to a Department OR an Employee 
Equipment.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Equipment, { foreignKey: 'departmentId' });

Equipment.belongsTo(User, { as: 'employee', foreignKey: 'employeeId' });
User.hasMany(Equipment, { foreignKey: 'employeeId' });

// --- MAINTENANCE ASSOCIATIONS ---

// Equipment & Team: Every asset must have a default team [cite: 12]
Equipment.belongsTo(MaintenanceTeam, { foreignKey: 'maintenanceTeamId' });
MaintenanceTeam.hasMany(Equipment, { foreignKey: 'maintenanceTeamId' });

// Maintenance Request Links [cite: 33, 41, 43]
MaintenanceRequest.belongsTo(Equipment);
MaintenanceRequest.belongsTo(MaintenanceTeam);
MaintenanceRequest.belongsTo(User, { as: 'technician', foreignKey: 'technicianId' });

export {
    User,
    Equipment,
    MaintenanceTeam,
    MaintenanceRequest,
    Department
};