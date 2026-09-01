import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || savedUser === "undefined" || savedUser === "null") {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (userData, token) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));

    if (token) {
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            login,
            logout,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
}

export default AuthContext;