import "./globals.css";
import { AuthProvider } from "@/src/context/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
