// DEV-ONLY local auth store using localStorage.
// For production replace with a real backend + hashed passwords.

const USERS_KEY = "dp_users";

function loadUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

export function findUser(email) {
    const em = normalizeEmail(email);
    return loadUsers().find((u) => u.email === em) || null;
}

export function createUser({ name, email, password }) {
    const users = loadUsers();
    const em = normalizeEmail(email);
    if (!name?.trim()) throw new Error("Full name is required");
    if (!em) throw new Error("Email is required");
    if (users.some((u) => u.email === em)) {
        throw new Error("An account with this email already exists");
    }
    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }
    const user = { name: name.trim(), email: em, password }; // DEV: plaintext
    users.push(user);
    saveUsers(users);
    // return a public profile (omit password)
    return { name: user.name, email: user.email };
}

export function verifyUser(email, password) {
    const em = normalizeEmail(email);
    const user = findUser(em);
    if (!user) return null;
    if (user.password !== password) return null;
    // return a public profile
    return { name: user.name, email: user.email };
}


export function updateUserPassword(email, currentPassword, newPassword) {
    const em = normalizeEmail(email);
    const users = loadUsers();
    const user = users.find((u) => u.email === em);
    if (!user) throw new Error("No account found for that email.");
    if (user.password !== currentPassword) throw new Error("Current password is incorrect.");
    if (!newPassword || newPassword.length < 6)
        throw new Error("New password must be at least 6 characters.");
    user.password = newPassword;
    saveUsers(users);
    return { email: user.email, name: user.name };
}
