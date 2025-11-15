import React, { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("carepharma-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    if (username === "user" && password === "123") {
      const userData = { username };
      const pass={ password };
      setUser(userData);
      localStorage.setItem("carepharma-user", JSON.stringify(userData));
      localStorage.setItem("carepharma-pass", JSON.stringify(pass));
      alert("Login successful");
      return true;
    }
    return false;
  };

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setUser(null);
      localStorage.removeItem("carepharma-user");
      alert("Logged out successfully");
    }
  };

  const isAuth = !!user;

  return (
    <UserContext.Provider value={{ user, login, logout, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};