import { AuthCheck } from "./auth-check";

export default function AuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthCheck requiredUserRole="guild-member">{children}</AuthCheck>;
}
