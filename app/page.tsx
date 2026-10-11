import { redirect } from "next/navigation";

// `/` only redirects (future role dispatcher). Opt this segment out of the
// "instant" navigation validation: the deliberate `redirect()` throws
// NEXT_REDIRECT during validation and is reported as a render failure
// (vercel/next.js#98711). There is no UI here to validate anyway.
export const instant = false;

export default function Home() {
  redirect("/feed");
}
