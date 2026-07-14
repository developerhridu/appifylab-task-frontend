"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { useCreatePost } from "../hooks/useFeed";
import { ApiError } from "@/lib/api-client";
import type { Visibility } from "../types";

export function PostComposer() {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(0);
  const [image, setImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const create = useCreatePost();

  const canPost = (content.trim().length > 0 || image) && !create.isPending;

  const submit = () => {
    if (!canPost) return;
    create.mutate(
      { content, visibility, image },
      {
        onSuccess: () => {
          setContent("");
          setImage(null);
          if (fileRef.current) fileRef.current.value = "";
        },
      }
    );
  };

  const error = create.error instanceof ApiError ? create.error.message : null;

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div className="form-floating _feed_inner_text_area_box_form" style={{ width: "100%" }}>
          <textarea
            className="form-control _textarea"
            placeholder="Write something ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ minHeight: 80 }}
          />
        </div>
      </div>

      {image && (
        <div className="_mar_t16" style={{ position: "relative", display: "inline-block" }}>
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            style={{ maxHeight: 160, borderRadius: 6, marginTop: 12 }}
          />
          <button
            type="button"
            onClick={() => {
              setImage(null);
              if (fileRef.current) fileRef.current.value = "";
            }}
            style={{ marginLeft: 12 }}
          >
            Remove
          </button>
        </div>
      )}

      {error && <p style={{ color: "#e5484d", marginTop: 8 }}>{error}</p>}

      <div className="_feed_inner_text_area_bottom" style={{ marginTop: 16, alignItems: "center" }}>
        <div className="_feed_inner_text_area_item" style={{ gap: 16, alignItems: "center" }}>
          <div className="_feed_inner_text_area_bottom_photo _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
              onClick={() => fileRef.current?.click()}
            >
              Photo
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
          </div>

          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <span>Visibility:</span>
            <select
              value={visibility}
              onChange={(e) => setVisibility(Number(e.target.value) as Visibility)}
              className="form-select"
              style={{ width: "auto", display: "inline-block" }}
            >
              <option value={0}>Public</option>
              <option value={1}>Private</option>
            </select>
          </label>
        </div>

        <div className="_feed_inner_text_area_btn">
          <button
            type="button"
            className="_feed_inner_text_area_btn_link"
            onClick={submit}
            disabled={!canPost}
          >
            <span>{create.isPending ? "Posting..." : "Post"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
