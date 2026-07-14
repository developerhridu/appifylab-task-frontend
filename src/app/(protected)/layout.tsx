"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/layout/TopNav";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // The auth cookie is httpOnly on the (cross-origin) API domain, so the edge
  // proxy can't read it — gate here instead, where /api/auth/me can validate it.
  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <TopNav />
        {children}
      </div>
    </div>
  );
}
