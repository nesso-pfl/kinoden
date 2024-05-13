import { AuthCheck } from "@/features/auth";

export default function AuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthCheck requiredUserRole="guildMember">{children}</AuthCheck>;
}
