import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "../components/providers/AppProvider";

export const metadata: Metadata = {
  title: "RentFlow",
  description: "Manage your properties with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
