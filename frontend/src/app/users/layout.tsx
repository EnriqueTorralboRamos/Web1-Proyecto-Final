import ProtectedLayout from "@/src/components/temp-middleware-solution/ProtectedLayout";

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}