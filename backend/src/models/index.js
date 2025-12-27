// src/models/index.js
import { User } from "./user.models.js";
import { Team } from "./team.models.js";
import { Equipment } from "./equipment.models.js";
import { Request } from "./request.models.js";

// --- 1. USER & TEAM ASSOCIATIONS ---
User.belongsTo(Team, { foreignKey: 'TeamId' });
Team.hasMany(User, { as: 'members', foreignKey: 'TeamId' });

// --- 2. EQUIPMENT & TEAM ASSOCIATIONS ---
Equipment.belongsTo(Team, { as: 'maintenanceTeam', foreignKey: 'MaintenanceTeamId' });
Team.hasMany(Equipment, { foreignKey: 'MaintenanceTeamId' });

// --- 3. REQUEST ASSOCIATIONS ---
Request.belongsTo(Equipment, { foreignKey: 'EquipmentId' });
Equipment.hasMany(Request, { foreignKey: 'EquipmentId' });

Request.belongsTo(User, { as: 'technician', foreignKey: 'UserId' });
User.hasMany(Request, { foreignKey: 'UserId' });

Request.belongsTo(Team, { foreignKey: 'TeamId' });
Team.hasMany(Request, { foreignKey: 'TeamId' });

export { User, Team, Equipment, Request };