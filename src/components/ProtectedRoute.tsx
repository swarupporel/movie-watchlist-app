import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { userEmail } = useAuth();

  if (!userEmail) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* Dramatic Cinema & Film Backdrop Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        style={{ pointerEvents: 'none' }}
      >
        {/* Film/Movie Themed Background Image (30% opacity with blend/merge effect) */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-500"
          style={{
            backgroundImage: `url('/movie_camera_background.png')`,
            backgroundPosition: '10% 10%',
            opacity: 0.28,
            mixBlendMode: 'soft-light',
            filter: 'contrast(1.2) brightness(0.85) saturate(0.6)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Ambient Projector Light Leak (Top center-left focus) */}
        <div 
          className="absolute inset-x-0 top-0 h-[600px] pointer-events-none transition-all duration-300 opacity-60 dark:opacity-80"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, rgba(236,72,153,0.06) 45%, transparent 100%)',
          }}
        />

        {/* Extra atmospheric backdrop gradient to guarantee perfect text contrast */}
        <div 
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 80%)'
          }}
        />
      </div>

      {/* Main Page Layout Wrapper */}
      <div className="relative z-10 w-full flex-grow flex flex-col">
        <Outlet />
      </div>
    </>
  );
};