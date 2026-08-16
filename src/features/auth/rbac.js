export const ROLE_PERMISSIONS = {
    admin: ['create_post', 'edit_post', 'delete_post', 'view_dashboard', 'manage_users'],
    editor: ['create_post', 'edit_post', 'view_dashboard'],
    viewer: ['view_dashboard'],
};

export const hasPermission = (role, permission) => {
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
};

export const canAccessRoute = (role, requiredRole) => {
    if (!requiredRole) return true;

    const rolePriority = {
        viewer: 1,
        editor: 2,
        admin: 3,
    };

    return (rolePriority[role] || 0) >= (rolePriority[requiredRole] || 0);
};