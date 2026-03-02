import type { Metadata } from "next";
import { Header } from "../components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "A modern task management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
