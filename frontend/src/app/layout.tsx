

import Link from "next/link";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>Barra de Navegación</header>
        <Link href={'/admin'}>Admin </Link>
        <Link href={'/programs'}>Programas </Link>
        <Link href={'/users'}>Users </Link>
        <main>{children}</main>
        <footer>Pie de Página</footer>
      </body>
    </html>
  );
}
