import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinoden Pfl",
  description: "どっときのこ用のキノコ伝説攻略用ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn(inter.className, "h-screen flex flex-col")}>
        <Header />
        <main className="flex justify-center py-8 flex-1">
          <div className="w-full max-w-7xl px-4">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
