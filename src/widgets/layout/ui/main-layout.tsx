import type { ReactNode } from "react";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { AuthModal } from "@/features/auth";
import { CartModal } from "@/features/cart";
import { NotificationModal } from "@/features/notification";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AuthModal />
      <NotificationModal />
      <CartModal />
      <main className="w-full flex-1 px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
