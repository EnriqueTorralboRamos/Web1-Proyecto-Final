import AdminProtection from "@/src/components/AdminProtection";
import ProtectedLayout from "@/src/components/ProtectedLayout";
import Sidenav from "@/src/components/Sidenav";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <AdminProtection>
        <div className="flex h-screen">
        {/* Barra lateral */}
        <Sidenav />
        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
      </AdminProtection>
    );
  }
  