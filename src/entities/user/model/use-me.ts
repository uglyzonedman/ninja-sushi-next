"use client";

import { useQuery } from "@tanstack/react-query";

import { getRefreshToken, useAuthStore } from "@/shared/model";

import { getMe } from "../api/get-me";

export const ME_QUERY_KEY = ["me"] as const;

/**
 * Текущий пользователь.
 * Запрос идёт, если есть accessToken в памяти или refreshToken в cookie
 * (после перезагрузки интерсептор сам получит новый accessToken по 401).
 */
export const useMe = () => {
  const hasAccessToken = useAuthStore((s) => !!s.accessToken);

  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: getMe,
    enabled: hasAccessToken || !!getRefreshToken(),
    retry: false,
  });
};
