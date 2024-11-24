import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [isSuperUser, setIsSuperUser] = useState(localStorage.getItem('isSuperUser') === 'true');

  const login = (accessToken, isSuperUserFlag) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isSuperUser', isSuperUserFlag ? 'true' : 'false');

    setIsAuthenticated(true);
    setIsSuperUser(isSuperUserFlag);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isSuperUser');

    setIsAuthenticated(false);
    setIsSuperUser(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
    setIsSuperUser(localStorage.getItem('isSuperUser') === 'true');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isSuperUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
