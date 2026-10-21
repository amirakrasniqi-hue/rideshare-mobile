import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RideShare",
  description: "Udhëtime për AAB",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sq" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
