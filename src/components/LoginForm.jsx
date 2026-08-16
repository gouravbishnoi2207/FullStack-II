import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginSuccess, logout } from '../features/auth/authSlice';
import { decodeJwt, isTokenValid, mockLogin } from '../utils/jwt';

function LoginForm() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const generatedToken = mockLogin(form.username, form.password);

    if (!generatedToken) {
      dispatch(loginFailure('Invalid username or password'));
      return;
    }

    if (!isTokenValid(generatedToken)) {
      dispatch(loginFailure('Token expired or invalid'));
      return;
    }

    const decodedUser = decodeJwt(generatedToken);
    dispatch(loginSuccess({ user: decodedUser, token: generatedToken }));
  };

  return (
    <div className="auth-card">
      <h2>{isAuthenticated ? 'Authenticated User' : 'Login'}</h2>

      {!isAuthenticated ? (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="admin, editor, viewer"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="admin123 / editor123 / viewer123"
            />
          </div>

          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      ) : (
        <div>
          <p>Welcome, {user?.username}</p>
          <p>Role: {user?.role}</p>
          <p>Token: {token}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
