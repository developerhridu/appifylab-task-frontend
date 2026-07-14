"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "../api";
import { useBumpCommentCount } from "@/features/posts/hooks/useFeed";
import type { LikeState } from "@/features/posts/types";
import type { Comment } from "../types";

export const commentsKey = (postId: string) => ["comments", postId] as const;

/** Comment tree for a post; only fetches when `enabled` (panel open). */
export function useComments(postId: string, enabled: boolean) {
  return useQuery({
    queryKey: commentsKey(postId),
    queryFn: () => commentsApi.list(postId),
    enabled,
  });
}

export function useCreateComment(postId: string) {
  const qc = useQueryClient();
  const bump = useBumpCommentCount();
  return useMutation({
    mutationFn: (input: { content: string; parentCommentId?: string | null }) =>
      commentsApi.create(postId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commentsKey(postId) });
      bump(postId, 1);
    },
  });
}

/** Recursively apply a patch to a comment (or nested reply) by id. */
function patchTree(list: Comment[], id: string, patch: Partial<Comment>): Comment[] {
  return list.map((c) =>
    c.id === id
      ? { ...c, ...patch }
      : { ...c, replies: patchTree(c.replies, id, patch) }
  );
}

function findInTree(list: Comment[], id: string): Comment | undefined {
  for (const c of list) {
    if (c.id === id) return c;
    const found = findInTree(c.replies, id);
    if (found) return found;
  }
  return undefined;
}

export function useCommentLike(postId: string) {
  const qc = useQueryClient();
  const key = commentsKey(postId);
  return useMutation({
    mutationFn: ({ commentId, like }: { commentId: string; like: boolean }) =>
      commentsApi.setLike(commentId, like),
    onMutate: async ({ commentId, like }) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Comment[]>(key);
      const current = prev ? findInTree(prev, commentId) : undefined;
      const delta = like ? 1 : -1;
      qc.setQueryData<Comment[]>(key, (list) =>
        list
          ? patchTree(list, commentId, {
              likedByMe: like,
              likeCount: Math.max(0, (current?.likeCount ?? 0) + delta),
            })
          : list
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(key, ctx.prev);
    },
    onSuccess: (state: LikeState, { commentId }) => {
      qc.setQueryData<Comment[]>(key, (list) =>
        list ? patchTree(list, commentId, { likeCount: state.likeCount, likedByMe: state.likedByMe }) : list
      );
    },
  });
}
