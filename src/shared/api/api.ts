import axios, { type InternalAxiosRequestConfig } from "axios";

import {
  getRefreshToken,
  useAuthStore,
  type AuthTokens,
} from "@/shared/model/auth-store";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Отдельный инстанс без интерсепторов — чтобы refresh не зациклился
const refreshApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshTokens = async (refreshToken: string) => {
  const res = await refreshApi.post<AuthTokens>("/api/auth/refresh", {
    refreshToken,
  });
  return res.data;
};

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Один общий refresh на все параллельные запросы, упавшие с 401
let refreshPromise: Promise<string> | null = null;

const getFreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const { setTokens } = useAuthStore.getState();
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token");

      // Бэкенд возвращает новую пару — сохраняем оба токена
      const tokens = await refreshTokens(refreshToken);
      setTokens(tokens);
      return tokens.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as RetryConfig | undefined;

    if (
      !axios.isAxiosError(error) ||
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      original.url?.startsWith("/api/auth/")
    ) {
      throw error;
    }

    original._retry = true;

    let accessToken: string;
    try {
      accessToken = await getFreshAccessToken();
    } catch (refreshError) {
      // refresh не прошёл — разлогиниваем
      useAuthStore.getState().clearTokens();
      throw refreshError;
    }

    original.headers.Authorization = `Bearer ${accessToken}`;
    return api(original);
  },
);
