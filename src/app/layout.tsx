import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test MD",
  description: "NPM Package creating for markup-markdown",
  keywords: ["npm", "md", "markup", "markdown", "react", "next"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
