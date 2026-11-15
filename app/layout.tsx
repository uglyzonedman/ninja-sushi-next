import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import { MainLayout } from "@/widgets/layout";
import { siteConfig } from "@/shared/config";
import { inter } from "@/app/styles/fonts";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="bg-[#F5F5F7] font-sans antialiased">
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
