"use client";

import { useInfiniteQuery, useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { postsApi } from "../api";
import type { FeedResult, LikeState, Post, Visibility } from "../types";

export const feedKey = ["feed"] as const;

type FeedData = InfiniteData<FeedResult>;

/** Infinite, keyset-paginated feed (newest first). */
export function useFeed() {
  return useInfiniteQuery({
    queryKey: feedKey,
    queryFn: ({ pageParam }) => postsApi.getFeed(pageParam as string | null),
    initialPageParam: null as string | null,
    getNextPageParam: (last) => last.nextCursor,
  });
}

/** Create a post, then prepend it to the first page so it appears on top instantly. */
export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { content: string; visibility: Visibility; image?: File | null }) =>
      postsApi.createPost(input),
    onSuccess: (post) => {
      qc.setQueryData<FeedData>(feedKey, (data) => {
        if (!data) return data;
        const [first, ...rest] = data.pages;
        const newFirst: FeedResult = { ...first, items: [post, ...first.items] };
        return { ...data, pages: [newFirst, ...rest] };
      });
    },
  });
}

function patchPost(data: FeedData | undefined, postId: string, patch: Partial<Post>): FeedData | undefined {
  if (!data) return data;
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((p) => (p.id === postId ? { ...p, ...patch } : p)),
    })),
  };
}

/** Optimistic like/unlike; reconciles with the server's authoritative count. */
export function usePostLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, like }: { postId: string; like: boolean }) => postsApi.setLike(postId, like),
    onMutate: async ({ postId, like }) => {
      await qc.cancelQueries({ queryKey: feedKey });
      const prev = qc.getQueryData<FeedData>(feedKey);
      const current = prev?.pages.flatMap((p) => p.items).find((p) => p.id === postId);
      const delta = like ? 1 : -1;
      qc.setQueryData<FeedData>(feedKey, (d) =>
        patchPost(d, postId, {
          likedByMe: like,
          likeCount: Math.max(0, (current?.likeCount ?? 0) + delta),
        })
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(feedKey, ctx.prev);
    },
    onSuccess: (state: LikeState, { postId }) => {
      qc.setQueryData<FeedData>(feedKey, (d) =>
        patchPost(d, postId, { likeCount: state.likeCount, likedByMe: state.likedByMe })
      );
    },
  });
}

/** Bump a post's comment count after a new comment/reply is added. */
export function useBumpCommentCount() {
  const qc = useQueryClient();
  return (postId: string, delta = 1) => {
    qc.setQueryData<FeedData>(feedKey, (d) => {
      if (!d) return d;
      const target = d.pages.flatMap((p) => p.items).find((p) => p.id === postId);
      return patchPost(d, postId, { commentCount: Math.max(0, (target?.commentCount ?? 0) + delta) });
    });
  };
}
