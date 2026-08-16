import { useSelector } from 'react-redux';
import { hasPermission } from '../features/auth/rbac';

function RoleDashboard() {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || 'viewer';

  return (
    <div className="auth-card">
      <h3>Role Dashboard</h3>
      <p>Current role: <strong>{role}</strong></p>

      {hasPermission(role, 'view_dashboard') && <p>✅ Dashboard access granted</p>}
      {hasPermission(role, 'create_post') && <p>✅ Create Post permission enabled</p>}
      {hasPermission(role, 'edit_post') && <p>✅ Edit Post permission enabled</p>}
      {hasPermission(role, 'delete_post') && <p>✅ Delete Post permission enabled</p>}
      {hasPermission(role, 'manage_users') && <p>✅ User Management permission enabled</p>}
    </div>
  );
}

export default RoleDashboard;
