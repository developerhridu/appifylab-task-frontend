import { api } from "@/lib/api-client";
import type { UserMini } from "@/features/auth/types";
import type { FeedResult, LikeState, Post, Visibility } from "./types";

export const postsApi = {
  getFeed: (cursor?: string | null, limit = 10) => {
    const params = new URLSearchParams();
    if (cursor) params.set("cursor", cursor);
    params.set("limit", String(limit));
    return api.get<FeedResult>(`/api/posts?${params.toString()}`);
  },

  createPost: (input: { content: string; visibility: Visibility; image?: File | null }) => {
    const form = new FormData();
    form.set("content", input.content);
    form.set("visibility", input.visibility === 1 ? "Private" : "Public");
    if (input.image) form.set("image", input.image);
    return api.postForm<Post>("/api/posts", form);
  },

  setLike: (postId: string, like: boolean) =>
    like
      ? api.post<LikeState>(`/api/posts/${postId}/like`)
      : api.del<LikeState>(`/api/posts/${postId}/like`),

  whoLiked: (postId: string) => api.get<UserMini[]>(`/api/posts/${postId}/likes`),
};
