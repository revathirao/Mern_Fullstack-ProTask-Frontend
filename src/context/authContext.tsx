import { createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import type {
   AuthContextType,
   User,
   RegisterCredentials,
} from "../types/index";

/**
 * AuthContext
 * Manages global authentication state for the app.
 * * Stores:-- logged-in user info, JWT token
 * * Exposes:-- login(),register(),logout()
 * * Uses:-- Axios for API requests,localStorage
 * to persist auth state across page reloads
 */
export const AuthContext = createContext<AuthContextType>({
   user: null,
   token: null,
   login: async (_email: string, _password: string) => {},
   register: async (_data: RegisterCredentials) => {},
   logout: () => {},
});

/**
 * AuthProvider
 * Wraps the application and provides authentication state
 * and actions to all child components.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
   /*** user:
    * Stores the currently logged-in user's information.
    * Persisted in localStorage so the user stays logged in after refresh.
    */
   const [token, setToken] = useLocalStorage<string | null>("token", null);

   /*** token:
    * Stores the JWT token returned from the backend.
    * Also persisted in localStorage.
    */
   const [user, setUser] = useLocalStorage<User | null>("user", null);

   /**
    * Sync JWT token with Axios default headers.
    **Whenever the token changes:
    * - If token exists → attach it to Authorization header
    * - If token is removed → delete Authorization header
    ** This ensures ALL axios requests automatically include the token.
    */
   useEffect(() => {
      if (token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
         delete axios.defaults.headers.common["Authorization"];
      }
   }, [token]);

   /**
    * login
    ** Called when the user submits the login form.
    * Sends email & password to the backend.
    ** Backend responds with:
    * - user object
    * - JWT token
    */
   async function login(email: string, password: string) {
      const res = await axios.post(
         `${import.meta.env.VITE_API_URL}/api/users/login`,
         {
            email,
            password,
         },
      );

      // Save user info in state + localStorage
      setUser(res.data.user);

      // Save token in state + localStorage
      setToken(res.data.token);
   }

   /**
    * register
    ** Called when a new user signs up.
    * Sends username, email, and password to the backend.
    ** Many APIs automatically log the user in after registration,
    * so we reuse the same response structure.
    */
   async function register(data: RegisterCredentials) {
      const res = await axios.post(
         `${import.meta.env.VITE_API_URL}/api/users/register`,
         {
            email: data.email,
            password: data.password,
            username: data.username,
         },
      );
      // Store newly created user
      setUser(res.data.user);

      // Store token returned by backend
      setToken(res.data.token);
   }
   /**
    * logout
    ** Logs the user out on the frontend.
    ** Since JWT is stateless, we:
    * - clear user info
    * - clear token
    * - remove Authorization header
    ** No backend request is needed.
    */
   function logout() {
      setUser(null);
      setToken(null);
   }

   /**
    * Provide authentication state and actions
    * to all child components using Context API.
    */
   return (
      <AuthContext.Provider value={{ user, token, login, register, logout }}>
         {children}
      </AuthContext.Provider>
   );
}
