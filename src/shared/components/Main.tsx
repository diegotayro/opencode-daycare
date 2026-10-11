import type { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

/** Scrollable main column. On desktop it behaves like the template's
 * `height:100vh; overflow-y:auto`. */
export function Main({ children }: MainProps) {
  return (
    <main className="flex-1 min-w-0 min-h-0 overflow-y-auto">{children}</main>
  );
}