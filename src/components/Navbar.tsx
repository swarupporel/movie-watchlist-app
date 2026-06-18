import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useWatchlist } from '../hooks/useWatchlist';
import { LogOut, Bookmark, Sun, Moon, Logo, Search } from './Icons';

export const Navbar: React.FC = () => {
  const { userEmail, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();
  const count = watchlist.length;

  if (!userEmail) return null;

  return (
    <header
      className="sticky top-0 z-50 px-4 py-3 transition-all duration-300"
      style={{
        backdropFilter: 'blur(12px)',
        background: theme === 'dark' ? 'rgba(13,15,20,0.85)' : 'rgba(255,255,255,0.85)',
        borderBottom: `1px solid var(--border)`,
        fontFamily: 'var(--font-body)',
      }}
    >
      <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center shrink-0"
          style={{ color: 'var(--text-primary)' }}
        >
          <Logo height={26} />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <Search size={15} />
            <span className="hidden sm:inline">Search</span>
          </Link>

          <div className="h-4 w-px" style={{ background: 'var(--border)' }} />

          <Link
            to="/watchlist"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <Bookmark size={15} />
            <span className="hidden sm:inline">My Watchlist</span>
            {count > 0 && (
              <span
                className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold leading-none"
                style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
              >
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>

          <div className="h-4 w-px" style={{ background: 'var(--border)' }} />

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center gap-1.5 text-sm transition-all cursor-pointer"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span className="hidden sm:inline">Theme</span>
          </button>

          <div className="h-4 w-px" style={{ background: 'var(--border)' }} />

          <span
            className="text-sm truncate max-w-[120px] md:max-w-[200px] hidden sm:inline"
            style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}
          >
            {userEmail}
          </span>

          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="p-2 rounded-lg transition-all"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};