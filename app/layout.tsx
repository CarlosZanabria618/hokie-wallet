import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hokie Wallet | Your money, simplified",
  description: "A student-friendly financial dashboard with sample balances, spending, savings goals, and FinBot.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
