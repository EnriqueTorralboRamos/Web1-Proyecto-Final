

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
        <main>{children}</main>
        <footer>Pie de Página</footer>
      </body>
    </html>
  );
}
