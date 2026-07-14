import type { UserMini } from "@/features/auth/types";

export interface Comment {
  id: string;
  author: UserMini;
  content: string;
  createdAt: string;
  likeCount: number;
  likedByMe: boolean;
  parentCommentId: string | null;
  replies: Comment[];
}
