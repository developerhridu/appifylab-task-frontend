import type { UserMini } from "@/features/auth/types";

export type Visibility = 0 | 1; // 0 = Public, 1 = Private

export interface Post {
  id: string;
  author: UserMini;
  content: string;
  imageUrl: string | null;
  visibility: Visibility;
  createdAt: string;
  likeCount: number;
  likedByMe: boolean;
  commentCount: number;
}

export interface FeedResult {
  items: Post[];
  nextCursor: string | null;
}

export interface LikeState {
  likeCount: number;
  likedByMe: boolean;
}
