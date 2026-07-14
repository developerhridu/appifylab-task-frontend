"use client";

import { useComments } from "../hooks/useComments";
import { CommentBox } from "./CommentBox";
import { CommentItem } from "./CommentItem";

export function CommentList({ postId, open }: { postId: string; open: boolean }) {
  const { data: comments, isLoading } = useComments(postId, open);

  if (!open) return null;

  return (
    <div className="_feed_inner_timeline_cooment_area" style={{ marginTop: 16 }}>
      <CommentBox postId={postId} />
      <div className="_timline_comment_main" style={{ marginTop: 16 }}>
        {isLoading ? (
          <p style={{ color: "#666" }}>Loading comments...</p>
        ) : !comments || comments.length === 0 ? (
          <p style={{ color: "#666" }}>No comments yet. Be the first.</p>
        ) : (
          comments.map((c) => <CommentItem key={c.id} postId={postId} comment={c} />)
        )}
      </div>
    </div>
  );
}
