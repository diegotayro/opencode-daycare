import type { ReactNode } from "react";

/** Access screens render without the app shell (no sidebar / mobile nav). */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
