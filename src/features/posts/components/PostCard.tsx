"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { CommentList } from "@/features/comments/components/CommentList";
import { WhoLikedModal } from "./WhoLikedModal";
import { postsApi } from "../api";
import { usePostLike } from "../hooks/useFeed";
import { relativeTime } from "@/lib/utils";
import type { Post } from "../types";

export function PostCard({ post }: { post: Post }) {
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const like = usePostLike();

  const toggleLike = () => like.mutate({ postId: post.id, like: !post.likedByMe });

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div className="_feed_inner_timeline_post_box_image">
              <Avatar firstName={post.author.firstName} lastName={post.author.lastName} />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title" style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
                {post.author.firstName} {post.author.lastName}
              </h4>
              <p className="_feed_inner_timeline_post_box_para" style={{ margin: 0, color: "#666", fontSize: 13 }}>
                {relativeTime(post.createdAt)} · {post.visibility === 1 ? "Private" : "Public"}
              </p>
            </div>
          </div>
        </div>

        {post.content && (
          <h4 className="_feed_inner_timeline_post_title" style={{ marginTop: 16, fontWeight: 400, fontSize: 16 }}>
            {post.content}
          </h4>
        )}

        {post.imageUrl && (
          <div className="_feed_inner_timeline_image" style={{ marginTop: 12 }}>
            <img src={post.imageUrl} alt="" className="_time_img" loading="lazy" style={{ maxWidth: "100%", borderRadius: 6 }} />
          </div>
        )}
      </div>

      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26" style={{ display: "flex", gap: 16, marginTop: 12 }}>
        {post.likeCount > 0 && (
          <button type="button" onClick={() => setShowLikes(true)} style={metaBtn}>
            {post.likeCount} like{post.likeCount === 1 ? "" : "s"}
          </button>
        )}
        {post.commentCount > 0 && (
          <span style={{ color: "#666", fontSize: 13 }}>
            {post.commentCount} comment{post.commentCount === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <div className="_feed_inner_timeline_reaction" style={{ display: "flex", gap: 8, padding: "0 24px" }}>
        <button
          className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${post.likedByMe ? "_feed_reaction_active" : ""}`}
          onClick={toggleLike}
          style={reactionBtn(post.likedByMe)}
        >
          {post.likedByMe ? "Liked" : "Like"}
        </button>
        <button
          className="_feed_inner_timeline_reaction_comment _feed_reaction"
          onClick={() => setShowComments((v) => !v)}
          style={reactionBtn(false)}
        >
          Comment
        </button>
      </div>

      <div className="_padd_r24 _padd_l24">
        <CommentList postId={post.id} open={showComments} />
      </div>

      <WhoLikedModal
        open={showLikes}
        onClose={() => setShowLikes(false)}
        queryKey={["post-likes", post.id]}
        fetcher={() => postsApi.whoLiked(post.id)}
      />
    </div>
  );
}

const metaBtn: React.CSSProperties = {
  border: 0,
  background: "none",
  padding: 0,
  cursor: "pointer",
  color: "#666",
  fontSize: 13,
};

function reactionBtn(active: boolean): React.CSSProperties {
  return {
    cursor: "pointer",
    fontWeight: active ? 600 : 400,
    color: active ? "var(--brand, #377dff)" : undefined,
  };
}
