import ProtectedLayout from "@/src/components/ProtectedLayout";

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}