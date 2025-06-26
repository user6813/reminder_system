import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/storeProvider';

export default function Header() {
  const { isAuthenticated, logout, user } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `header-link${isActive ? ' header-link-active' : ''}`;

  return (
    <>
      <header className="header-root">
        <div className="header-row">
          <nav className="header-nav">
            <NavLink to="/login" className={linkStyle}>Login</NavLink>
            <NavLink to="/signup" className={linkStyle}>Sign Up</NavLink>
            <NavLink to="/reminders" className={linkStyle}>Reminders</NavLink>
          </nav>
          {isAuthenticated && (
            <div className="header-user">
              <span className="header-user-info">
                {user.username} ({user.email})
              </span>
              <button className="header-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <style>{`
        .header-root {
          background: #f8f9fa;
          padding: 16px 0;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 50px;
        }
        .header-nav {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .header-link {
          text-decoration: none;
          color: #007bff;
          background: transparent;
          padding: 6px 18px;
          border-radius: 4px;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .header-link-active {
          color: #fff;
          background: #007bff;
        }
        .header-user {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .header-user-info {
          color: #333;
          font-weight: 500;
        }
        .header-logout-btn {
          padding: 6px 18px;
          background: #dc3545;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}
