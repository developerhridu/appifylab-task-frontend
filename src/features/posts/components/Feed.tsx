"use client";

import { useFeed } from "../hooks/useFeed";
import { PostCard } from "./PostCard";

export function Feed() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeed();

  if (isLoading) return <p style={{ color: "#666" }}>Loading feed...</p>;
  if (isError) return <p style={{ color: "#e5484d" }}>Failed to load feed.</p>;

  const posts = data?.pages.flatMap((p) => p.items) ?? [];

  if (posts.length === 0) return <p style={{ color: "#666" }}>No posts yet. Create the first one above.</p>;

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && (
        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <button className="_btn1" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
