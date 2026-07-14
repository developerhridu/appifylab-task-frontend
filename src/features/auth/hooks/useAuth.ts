"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";
import { ApiError } from "@/lib/api-client";
import type { User } from "../types";

export const meQueryKey = ["auth", "me"] as const;

/** Current user (null when unauthenticated). Cached across the app. */
export function useAuth() {
  const query = useQuery<User | null>({
    queryKey: meQueryKey,
    queryFn: async () => {
      try {
        return await authApi.me();
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) return null;
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
  };
}
