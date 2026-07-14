import { api } from "@/lib/api-client";
import type { UserMini } from "@/features/auth/types";
import type { LikeState } from "@/features/posts/types";
import type { Comment } from "./types";

export const commentsApi = {
  list: (postId: string) => api.get<Comment[]>(`/api/posts/${postId}/comments`),

  create: (postId: string, input: { content: string; parentCommentId?: string | null }) =>
    api.post<Comment>(`/api/posts/${postId}/comments`, input),

  setLike: (commentId: string, like: boolean) =>
    like
      ? api.post<LikeState>(`/api/comments/${commentId}/like`)
      : api.del<LikeState>(`/api/comments/${commentId}/like`),

  whoLiked: (commentId: string) => api.get<UserMini[]>(`/api/comments/${commentId}/likes`),
};
