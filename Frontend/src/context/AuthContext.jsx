import { createContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // fn for login
  async function login(credentials) {
    const response = await authService.login(credentials);

    setUser(response.data.message.loggedInUser);
  }

  // fn for logout
  async function logout() {
    await authService.logout();

    setUser(null);
  }

  async function register(data) {
    console.log("registerd called");
    const response = await authService.register(data);

    return response;
  }

  //  // fn for load page before getting data
  async function loadUser() {
    try {
      const response = await authService.getCurrentUser();

      setUser(response.data.message);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/// note:

/* 
in this file we are just made fn for each service which will set data
so instead of creating user useState in every component we just need to call these fn
means this file is provider of data
in in routes just wrap routes with authRouter
then every components inside authProvider will have access of logged in user's data
*/
