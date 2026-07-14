import { api } from "@/lib/api-client";
import type { LoginInput, RegisterInput, User } from "./types";

export const authApi = {
  register: (input: RegisterInput) => api.post<User>("/api/auth/register", input),
  login: (input: LoginInput) => api.post<User>("/api/auth/login", input),
  logout: () => api.post<void>("/api/auth/logout"),
  me: () => api.get<User>("/api/auth/me"),
};
