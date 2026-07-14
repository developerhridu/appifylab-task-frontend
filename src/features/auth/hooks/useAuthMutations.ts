"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api";
import { meQueryKey } from "./useAuth";
import type { LoginInput, RegisterInput, User } from "../types";

/** Shared success path: cache the user and land on the feed. */
function useAuthSuccess() {
  const qc = useQueryClient();
  const router = useRouter();
  return (user: User) => {
    qc.setQueryData(meQueryKey, user);
    router.replace("/feed");
  };
}

export function useLogin() {
  const onSuccess = useAuthSuccess();
  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess,
  });
}

export function useRegister() {
  const onSuccess = useAuthSuccess();
  return useMutation({
    mutationFn: (input: RegisterInput) => authApi.register(input),
    onSuccess,
  });
}

export function useLogout() {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      qc.setQueryData(meQueryKey, null);
      qc.clear();
      router.replace("/login");
    },
  });
}
