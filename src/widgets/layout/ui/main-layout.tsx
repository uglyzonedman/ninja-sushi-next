import type { ReactNode } from "react";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { AuthModal } from "@/features/auth";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AuthModal />
      <main className="w-full flex-1 px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
