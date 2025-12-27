import * as React from "react";
const { createContext, useContext, useEffect, useMemo, useState } = React;
import api from "@/lib/api";
import { generateAvatarBlob } from "@/lib/avatar-placeholder";

export type UserRole = "manager" | "technician";

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
    fullName?: string;
    avatar?: string;
    username?: string;
}

interface StoredUser extends AuthUser {
    password: string;
    refreshToken?: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (params: { email: string; password: string }) => Promise<{ ok: true } | { ok: false; error: string }>;
    signup: (params: { email: string; password: string; role: UserRole; fullName: string }) => Promise<{ ok: true } | { ok: false; error: string }>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const STORAGE_SESSION_KEY = "gearguard_auth_session";
const STORAGE_USERS_KEY = "gearguard_auth_users";

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
    try {
        const raw = localStorage.getItem(STORAGE_USERS_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed as StoredUser[];
    } catch {
        return [];
    }
}

function writeUsers(users: StoredUser[]) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

function readSession(): AuthUser | null {
    try {
        const raw = localStorage.getItem(STORAGE_SESSION_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as AuthUser;
        if (!parsed?.email || !parsed?.role) return null;
        if (parsed.role !== "manager" && parsed.role !== "technician") return null;
        return parsed;
    } catch {
        return null;
    }
}

function writeSession(session: AuthUser | null) {
    if (!session) {
        localStorage.removeItem(STORAGE_SESSION_KEY);
        return;
    }
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const response = await api.post('/api/v1/users/current-user');
                    setUser(response.data.data.user);
                }
            } catch (error) {
                // Token is invalid, clear it
                localStorage.removeItem('accessToken');
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login: AuthContextValue["login"] = async ({ email, password }) => {
        try {
            const response = await api.post('/api/v1/users/login', {
                email,
                password
            });
            
            const { user: loggedInUser, accessToken } = response.data.data;
            
            // Store token
            localStorage.setItem('accessToken', accessToken);
            
            // Update user state
            setUser(loggedInUser);
            
            return { ok: true };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            return { ok: false, error: errorMessage };
        }
    };

    const signup: AuthContextValue["signup"] = async ({ email, password, role, fullName }) => {
        try {
            // Map frontend role to backend role
            const backendRole = role === 'manager' ? 'USER' : 'TECHNICIAN';
            
            // Generate username from email (backend expects username)
            const username = email.split('@')[0] + Date.now();
            
            // Create FormData for avatar upload
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('username', username);
            formData.append('role', backendRole);
            
            // Generate avatar with initials
            const avatarBlob = await generateAvatarBlob(fullName);
            const avatarFile = new File([avatarBlob], 'avatar.png', { type: 'image/png' });
            formData.append('avatar', avatarFile);
            
            const response = await api.post('/api/v1/users/register', formData);
            
            // After successful registration, login automatically
            return await login({ email, password });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            return { ok: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/v1/users/logout');
        } catch (error) {
            // Continue with logout even if API call fails
            console.error('Logout API call failed:', error);
        } finally {
            // Clear local state
            localStorage.removeItem('accessToken');
            setUser(null);
        }
    };
    
    const refreshUser = async () => {
        try {
            const response = await api.post('/api/v1/users/current-user');
            setUser(response.data.data.user);
        } catch (error) {
            // Token is invalid, clear it
            localStorage.removeItem('accessToken');
            setUser(null);
        }
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            isLoading,
            login,
            signup,
            logout,
            refreshUser,
        }),
        [user, isLoading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
