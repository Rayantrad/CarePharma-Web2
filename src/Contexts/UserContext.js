import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext(null); // ✅ renamed from AuthContext

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === 'testuser' && password === 'password') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext); // ✅ now matches CheckOutPage usage
};