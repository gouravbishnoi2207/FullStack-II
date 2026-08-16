export const base64UrlEncode = (value) => {
    const encoded = btoa(JSON.stringify(value));
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

export const base64UrlDecode = (value) => {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return JSON.parse(atob(padded));
};

export const generateMockJwt = (payload, secret = 'social-media-demo-secret') => {
    const header = base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
    const timeNow = Math.floor(Date.now() / 1000);
    const safePayload = {
        ...payload,
        iat: timeNow,
        exp: timeNow + 60 * 60,
    };
    const encodedPayload = base64UrlEncode(safePayload);
    const signature = base64UrlEncode({ secret, payload: safePayload.username, timestamp: timeNow });

    return `${header}.${encodedPayload}.${signature}`;
};

export const decodeJwt = (token) => {
    if (!token || typeof token !== 'string') {
        return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        return null;
    }

    try {
        return base64UrlDecode(parts[1]);
    } catch {
        return null;
    }
};

export const isTokenValid = (token) => {
    const payload = decodeJwt(token);
    if (!payload) {
        return false;
    }

    if (!payload.exp) {
        return true;
    }

    return Math.floor(Date.now() / 1000) < payload.exp;
};

export const mockLogin = (username, password) => {
    const knownUsers = {
        admin: { password: 'admin123', role: 'admin' },
        editor: { password: 'editor123', role: 'editor' },
        viewer: { password: 'viewer123', role: 'viewer' },
    };

    const selectedUser = knownUsers[username];

    if (!selectedUser || selectedUser.password !== password) {
        return null;
    }

    return generateMockJwt({
        username,
        role: selectedUser.role,
        email: `${username}@example.com`,
    });
};