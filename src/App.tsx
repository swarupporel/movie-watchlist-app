import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GuestRoute } from './components/GuestRoute';
import { Navbar } from './components/Navbar';

import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { MovieDetail } from './pages/MovieDetail';
import { Watchlist } from './pages/Watchlist';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <div
                className="min-h-screen flex flex-col"
                style={{ background: 'var(--bg)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
              >
                <Navbar />
                <main
                  className="flex-grow w-full mx-auto px-4 py-8"
                  style={{ maxWidth: '1280px' }}
                >
                  <Routes>
                    <Route element={<GuestRoute />}>
                      <Route path="/login" element={<Login />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/movie/:id" element={<MovieDetail />} />
                      <Route path="/watchlist" element={<Watchlist />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;