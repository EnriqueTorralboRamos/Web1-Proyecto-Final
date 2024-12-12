import Sidenav from "@/src/components/Sidenav";
import PrivateRoute from "@/src/components/temp-middleware-solution/ProtectedLayout";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <PrivateRoute>
        <div className="flex flex-col md:flex-row overflow-hidden h-screen ">
        {/* Barra lateral */}
        <Sidenav />
        {/* Contenido principal */}
        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          {children}
        </main>
      </div>
      </PrivateRoute>
    );
  }
  