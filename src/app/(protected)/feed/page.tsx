import { PostComposer } from "@/features/posts/components/PostComposer";
import { Feed } from "@/features/posts/components/Feed";

export default function FeedPage() {
  return (
    <main>
      <PostComposer />
      <Feed />
    </main>
  );
}
