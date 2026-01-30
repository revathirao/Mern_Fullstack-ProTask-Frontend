import { createContext, useState } from "react";

export const AuthContext = createContext;

export function AuthProvider({ children }: { children: React.ReactNode }) {
      // Load token from localStorage on refresh


}