import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isTokenExpired = decoded.exp * 1000 < Date.now();
        
        if (isTokenExpired) {
          console.warn("Token expired");
          logout();
        } else {
          console.log("Decoded Token:", decoded);
          setAuthToken(token);
          setUserDetails(decoded);
        }
      } catch (error) {
        console.error("Invalid token:", error.message);
        logout();
      }
    }
  }, []);

  // Login function to save token and user details in localStorage
  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("authToken", token);
      setAuthToken(token);
      setUserDetails(decoded);
     
    } catch (error) {
      console.error("Failed to decode token:", error.message);
    }
  };

  // Logout function to clear token and user details from localStorage
  const logout = () => {
    localStorage.removeItem("authToken");
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
