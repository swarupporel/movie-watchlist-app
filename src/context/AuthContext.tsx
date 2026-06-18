import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('current_user_email');
  });

  const login = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    localStorage.setItem('current_user_email', cleanEmail);
    if (!localStorage.getItem(`watchlist_${cleanEmail}`)) {
      localStorage.setItem(`watchlist_${cleanEmail}`, JSON.stringify([]));
    }
    setUserEmail(cleanEmail);
  };

  const logout = () => {
    localStorage.removeItem('current_user_email');
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};