import { TopNav } from "@/components/layout/TopNav";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <TopNav />
        {children}
      </div>
    </div>
  );
}
