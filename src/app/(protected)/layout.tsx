"use client";

/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLogout } from "@/features/auth/hooks/useAuthMutations";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <div className="_layout _layout_main_wrapper">
      <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
        <div className="container _custom_container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a className="navbar-brand" href="/feed">
            <img src="/assets/images/logo.svg" alt="Buddy Script" className="_nav_logo" style={{ height: 36 }} />
          </a>

          <div className="_header_nav_profile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {user && (
              <>
                <Avatar firstName={user.firstName} lastName={user.lastName} size={38} />
                <span className="_header_nav_para">{user.firstName} {user.lastName}</span>
              </>
            )}
            <button className="_btn1" onClick={() => logout.mutate()} disabled={logout.isPending}>
              {logout.isPending ? "..." : "Log out"}
            </button>
          </div>
        </div>
      </nav>

      <div className="container _custom_container" style={{ maxWidth: 720, margin: "24px auto" }}>
        {children}
      </div>
    </div>
  );
}
