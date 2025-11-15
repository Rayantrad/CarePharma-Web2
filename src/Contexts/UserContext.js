import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "user" && password === "123") {
      alert("Login successful");
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      setUser(null);
      alert("Logged out successfully");
    }
  };

  const isAuth = !!user; // ✅ derived auth flag

  return (
    <UserContext.Provider value={{ user, login, logout, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};
