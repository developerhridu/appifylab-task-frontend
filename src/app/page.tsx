import { redirect } from "next/navigation";

export default function Home() {
  // Landing goes to the feed; middleware bounces unauthenticated users to /login.
  redirect("/feed");
}
