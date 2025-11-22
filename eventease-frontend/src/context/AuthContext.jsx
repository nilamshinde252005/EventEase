// authApi.js = talks to the backend.
// AuthContext.jsx = stores authentication state in the frontend.
// src/context/AuthContext.jsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginApi, registerApi } from "../api/authApi";

// 1) Create a Context object that will hold all auth-related data & functions.
//    Any component can use this via the useAuth() hook.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // user: info about the currently logged-in user (or null if logged out)
  // token: the JWT string returned by the backend
  // loading: true while we are checking localStorage on first load
  const [user, setUser] = useState(null);   // { id, name, email, role }
  const [token, setToken] = useState(null); // JWT string
  const [loading, setLoading] = useState(true);

  // 2) When the app first mounts, try to restore auth state from localStorage.
  //    This makes the user "stay logged in" when they refresh the page.
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        // storedUser should be a JSON string like: '{"id":1,"name":"Nilam",...}'
        const parsedUser = JSON.parse(storedUser);

        setToken(storedToken);
        setUser(parsedUser);
      } catch (err) {
        // If something went wrong (e.g. "undefined" or invalid JSON),
        // log it and clean up the broken values so it doesn't crash again.
        console.error("Failed to parse stored user from localStorage", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    // We are done checking localStorage.
    setLoading(false);
  }, []);

  // 3) Helper that we call after a successful login.
  //    It updates React state + localStorage in one place.
  function handleLoginSuccess({ token, user }) {
    // Update React state
    setToken(token);
    setUser(user);

    // Persist to localStorage so the user stays logged in on refresh
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  // 4) Login function used by the Login page.
  //    It calls the backend via loginApi, checks response, then stores token+user.
  async function login(email, password) {
    // loginApi does: POST /auth/login  and returns res.data
    // Expected shape from backend:
    // { success: true, data: { token, user }, message?: string }
    const res = await loginApi({ email, password });

    if (!res.success) {
      // If backend says success: false, throw an error so UI can show it
      throw new Error(res.message || "Login failed");
    }

    // res.data = { token, user }
    handleLoginSuccess(res.data);
  }

  // 5) Register function used by the Register page.
  //    It calls the backend and returns the response.
  //    (You can optionally auto-login after register if you want.)
  async function register(name, email, password) {
    const res = await registerApi({ name, email, password });

    if (!res.success) {
      throw new Error(res.message || "Registration failed");
    }

    // For now we just return the whole response. The UI can show a success message.
    return res;
  }

  // 6) Logout: clear everything from React state + localStorage
  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // 7) Convenience flag to check if the user is an admin
  const isAdmin = user?.role === "ADMIN";

  // 8) This is the global "auth object" that the rest of the app will use.
  //    Any component can do: const { user, login, logout } = useAuth();
  const value = {
    user,
    token,
    isAdmin,
    login,
    register,
    logout,
    loading,
  };

  // 9) Wrap children with the provider so they all get access to the value above.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 10) Custom hook so components can use auth easily
export function useAuth() {
  return useContext(AuthContext);
}

/*
How this is used in your app:

In main.jsx (or wherever you render <App />):

  import { AuthProvider } from "./context/AuthContext";

  ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

Inside any component:

  import { useAuth } from "../context/AuthContext";

  function NavBar() {
    const { user, logout } = useAuth();
    ...
  }

*/
