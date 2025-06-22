import React, { createContext, useContext, useState, useEffect } from "react";
// const profileImg = "/assets/img-src/profile.jpg";
import profileImg2 from "/assets/img-src/profile2.jpg";

// Create the AuthContext
const AuthContext = createContext();

// Hook to use the context easily
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around your app
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage for saved user session
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save user in localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Mock signup
  const signup = async (email, password, profileImg2) => {
    // Call your real backend API here
    const newUser = { email, profileImg2 }; // Add more fields as needed
    setUser(newUser);
    return newUser;
  };

  // Mock login
  const login = async (email, password) => {
    // Replace this with your backend auth call
    const fakeUser = { email, profileImg2: "https://via.placeholder.com/150" };
    setUser(fakeUser);
    return fakeUser;
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
