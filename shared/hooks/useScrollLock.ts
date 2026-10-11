import { useEffect } from "react";

/** Locks the body scroll while `active` is true (mobile drawer open). */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}