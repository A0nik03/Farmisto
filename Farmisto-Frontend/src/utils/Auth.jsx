import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  // Load token and user details from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("userDetails");
    if (token) {
      setAuthToken(token);
    }
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  // Login function to save token and user details
  const login = (token, user) => {
    console.log("Checking:", token)
    localStorage.setItem("authToken", token);
    localStorage.setItem("userDetails", JSON.stringify(user));
    setAuthToken(token);
    setUserDetails(user);
  };

  // Logout function to clear token and user details
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    setAuthToken(null);
    setUserDetails(null);
  };

  const value = {
    authToken,
    userDetails,
    login,
    logout,
    isAuthenticated: !!authToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
