import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import Appbar from "./_components/Appbar";
import Providers from "./_components/Providers";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
          <body className={inter.className}>
          <Appbar />
            {children}
            <Toaster />
          </body>
          <Footer />
      </Providers>

    </html>
  );
}
