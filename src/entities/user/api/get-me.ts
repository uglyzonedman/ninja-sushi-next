import { api } from "@/shared/api/api";

import type { User } from "../model/types";

export const getMe = async () => {
  const res = await api.get<User>("/api/users/me");
  return res.data;
};
