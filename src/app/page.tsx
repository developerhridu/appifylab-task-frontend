import { redirect } from "next/navigation";

export default function Home() {
  // Landing goes to the feed; the protected layout bounces unauthenticated users to /login.
  redirect("/feed");
}
