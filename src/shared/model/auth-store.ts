import Cookies from "js-cookie";
import { create } from "zustand";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const REFRESH_TOKEN_COOKIE = "refreshToken";
const REFRESH_TOKEN_TTL_DAYS = 30;

/** refreshToken живёт в cookie, переживает перезагрузку страницы */
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_COOKIE) ?? null;

const setRefreshToken = (token: string) =>
  Cookies.set(REFRESH_TOKEN_COOKIE, token, {
    expires: REFRESH_TOKEN_TTL_DAYS,
    path: "/",
    sameSite: "strict",
    secure: globalThis.location?.protocol === "https:",
  });

const removeRefreshToken = () =>
  Cookies.remove(REFRESH_TOKEN_COOKIE, { path: "/" });

type AuthState = {
  /** accessToken хранится только в памяти */
  accessToken: string | null;
  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  setTokens: ({ accessToken, refreshToken }) => {
    setRefreshToken(refreshToken);
    set({ accessToken });
  },
  clearTokens: () => {
    removeRefreshToken();
    set({ accessToken: null });
  },
}));
