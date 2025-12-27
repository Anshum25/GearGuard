import * as React from "react";
const { createContext, useContext, useEffect, useMemo, useState } = React;

export type UserRole = "manager" | "technician";

export interface AuthUser {
    email: string;
    role: UserRole;
    fullName?: string;
    teamName?: string;
}

interface StoredUser extends AuthUser {
    password: string;
    fullName: string;
    teamName?: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (params: { email: string; password: string }) => { ok: true } | { ok: false; error: string };
    signup: (params: { email: string; password: string; role: UserRole; fullName: string }) => { ok: true } | { ok: false; error: string };
    logout: () => void;
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

    useEffect(() => {
        setUser(readSession());
    }, []);

    const login: AuthContextValue["login"] = ({ email, password }) => {
        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail || !password) return { ok: false, error: "Email and password are required." };

        const users = readUsers();
        const found = users.find((u) => u.email.toLowerCase() === normalizedEmail);
        if (!found) return { ok: false, error: "Invalid email or password." };
        if (found.password !== password) return { ok: false, error: "Invalid email or password." };

        const session: AuthUser = { email: found.email, role: found.role, fullName: found.fullName };
        writeSession(session);
        setUser(session);
        return { ok: true };
    };

    const signup: AuthContextValue["signup"] = ({ email, password, role, fullName }) => {
        const normalizedEmail = email.trim().toLowerCase();
        const trimmedFullName = fullName.trim();
        
        if (!normalizedEmail || !password || !trimmedFullName) {
            return { ok: false, error: "All fields are required." };
        }
        if (role !== "manager" && role !== "technician") return { ok: false, error: "Please select a role." };

        const users = readUsers();
        const exists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
        if (exists) return { ok: false, error: "An account with this email already exists." };

        const newUser: StoredUser = { email: normalizedEmail, password, role, fullName: trimmedFullName };
        writeUsers([newUser, ...users]);

        const session: AuthUser = { email: newUser.email, role: newUser.role, fullName: newUser.fullName };
        writeSession(session);
        setUser(session);
        return { ok: true };
    };

    const logout = () => {
        writeSession(null);
        setUser(null);
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            login,
            signup,
            logout,
        }),
        [user],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
