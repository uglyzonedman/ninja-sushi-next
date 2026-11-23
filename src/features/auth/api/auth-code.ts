import { api } from "@/shared/api/api";

interface AuthCodeRequest {
  email: string;
}

export const authCodes = async (request: AuthCodeRequest) => {
  const res = await api.post<void>("/api/auth/code", request);
  return res.data;
};
