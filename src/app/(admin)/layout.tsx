import { AuthCheck } from "@/features/auth";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthCheck requiredUserRole="admin">{children}</AuthCheck>;
}
