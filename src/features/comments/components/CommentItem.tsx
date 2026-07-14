"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { WhoLikedModal } from "@/features/posts/components/WhoLikedModal";
import { commentsApi } from "../api";
import { useCommentLike } from "../hooks/useComments";
import { CommentBox } from "./CommentBox";
import { relativeTime } from "@/lib/utils";
import type { Comment } from "../types";

export function CommentItem({ postId, comment }: { postId: string; comment: Comment }) {
  const [showReply, setShowReply] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const like = useCommentLike(postId);

  const toggleLike = () => like.mutate({ commentId: comment.id, like: !comment.likedByMe });

  return (
    <div className="_comment_main" style={{ display: "flex", gap: 10, marginBottom: 14 }}>
      <div className="_comment_image">
        <Avatar firstName={comment.author.firstName} lastName={comment.author.lastName} size={36} />
      </div>
      <div className="_comment_area" style={{ flex: 1 }}>
        <div className="_comment_details">
          <div className="_comment_name">
            <h4 className="_comment_name_title" style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
              {comment.author.firstName} {comment.author.lastName}
            </h4>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text" style={{ margin: "2px 0" }}>
              <span>{comment.content}</span>
            </p>
          </div>
          <div className="_comment_reply">
            <ul className="_comment_reply_list" style={{ display: "flex", gap: 14, listStyle: "none", padding: 0, margin: 0, fontSize: 13 }}>
              <li>
                <button type="button" onClick={toggleLike} style={linkBtn(comment.likedByMe)}>
                  {comment.likedByMe ? "Liked" : "Like"}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setShowReply((v) => !v)} style={linkBtn(false)}>
                  Reply
                </button>
              </li>
              {comment.likeCount > 0 && (
                <li>
                  <button type="button" onClick={() => setShowLikes(true)} style={linkBtn(false)}>
                    {comment.likeCount} like{comment.likeCount === 1 ? "" : "s"}
                  </button>
                </li>
              )}
              <li>
                <span className="_time_link" style={{ color: "#999" }}>
                  {relativeTime(comment.createdAt)}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {showReply && (
          <div style={{ marginTop: 8 }}>
            <CommentBox
              postId={postId}
              parentCommentId={comment.id}
              placeholder={`Reply to ${comment.author.firstName}`}
              autoFocus
              onDone={() => setShowReply(false)}
            />
          </div>
        )}

        {comment.replies.length > 0 && (
          <div style={{ marginTop: 12, marginLeft: 8, borderLeft: "2px solid #eee", paddingLeft: 12 }}>
            {comment.replies.map((r) => (
              <CommentItem key={r.id} postId={postId} comment={r} />
            ))}
          </div>
        )}

        <WhoLikedModal
          open={showLikes}
          onClose={() => setShowLikes(false)}
          queryKey={["comment-likes", comment.id]}
          fetcher={() => commentsApi.whoLiked(comment.id)}
        />
      </div>
    </div>
  );
}

function linkBtn(active: boolean): React.CSSProperties {
  return {
    border: 0,
    background: "none",
    padding: 0,
    cursor: "pointer",
    fontWeight: active ? 600 : 400,
    color: active ? "var(--brand, #377dff)" : "#666",
  };
}
