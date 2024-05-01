import { AuthCheck } from "@/features/auth";

export default function AuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthCheck requiredUserRole="guild-member">{children}</AuthCheck>;
}
