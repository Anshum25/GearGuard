import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING },
    role: { 
        type: DataTypes.ENUM('USER', 'TECHNICIAN'), 
        defaultValue: 'USER',
        allowNull: false 
    },
    TeamId: {
        type: DataTypes.UUID,
        allowNull: true,
        validate: {
            // Custom validation: Team can only be assigned to Technicians
            isTechnician(value) {
                if (value && this.role !== 'Technician') {
                    throw new Error('Only a Technician can be assigned to a team.');
                }
            }
        }
    },
    refreshToken: { type: DataTypes.STRING }
}, {
    timestamps: true,
    hooks: {
        // Automatically clear TeamId if the role is changed to 'User'
        beforeValidate: (user) => {
            if (user.role === 'User') {
                user.TeamId = null;
            }
        },
        beforeSave: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

User.prototype.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.prototype.generateAccessToken = function() {
    return jwt.sign({
        id: this.id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};

User.prototype.generateRefreshToken = function() {
    return jwt.sign({
        id: this.id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};

export { User };