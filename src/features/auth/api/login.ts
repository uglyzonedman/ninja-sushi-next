import { api } from "@/shared/api/api";
import type { AuthTokens } from "@/shared/model";

interface LoginRequest {
  code: string;
  email: string;
}

export const login = async (request: LoginRequest) => {
  const res = await api.post<AuthTokens>("/api/auth/login", request);
  return res.data;
};
