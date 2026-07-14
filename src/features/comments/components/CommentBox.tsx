"use client";

import { useState } from "react";
import { useCreateComment } from "../hooks/useComments";

interface CommentBoxProps {
  postId: string;
  parentCommentId?: string | null;
  placeholder?: string;
  autoFocus?: boolean;
  onDone?: () => void;
}

export function CommentBox({ postId, parentCommentId, placeholder = "Write a comment", autoFocus, onDone }: CommentBoxProps) {
  const [content, setContent] = useState("");
  const create = useCreateComment(postId);

  const submit = () => {
    const text = content.trim();
    if (!text || create.isPending) return;
    create.mutate(
      { content: text, parentCommentId: parentCommentId ?? null },
      {
        onSuccess: () => {
          setContent("");
          onDone?.();
        },
      }
    );
  };

  return (
    <div className="_feed_inner_comment_box">
      <div className="_feed_inner_comment_box_form" style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div className="_feed_inner_comment_box_content" style={{ flex: 1 }}>
          <div className="_feed_inner_comment_box_content_txt">
            <textarea
              className="form-control _comment_textarea"
              placeholder={placeholder}
              value={content}
              autoFocus={autoFocus}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
            />
          </div>
        </div>
        <button type="button" className="_btn1" onClick={submit} disabled={create.isPending || !content.trim()}>
          {create.isPending ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
