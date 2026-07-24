import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Leet Coder",
  description: "Protected admin dashboard for managing problems",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-950 text-white">{children}</div>;
}
