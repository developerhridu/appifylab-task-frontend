"use client";

import { useQuery } from "@tanstack/react-query";
import { Modal } from "@/components/ui/Modal";
import { Avatar } from "@/components/ui/Avatar";
import type { UserMini } from "@/features/auth/types";

interface WhoLikedModalProps {
  open: boolean;
  onClose: () => void;
  queryKey: readonly unknown[];
  fetcher: () => Promise<UserMini[]>;
}

export function WhoLikedModal({ open, onClose, queryKey, fetcher }: WhoLikedModalProps) {
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: fetcher,
    enabled: open,
  });

  return (
    <Modal open={open} title="Liked by" onClose={onClose}>
      {isLoading ? (
        <p>Loading...</p>
      ) : !data || data.length === 0 ? (
        <p style={{ color: "#666" }}>No likes yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {data.map((u) => (
            <li key={u.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar firstName={u.firstName} lastName={u.lastName} size={36} />
              <span>
                {u.firstName} {u.lastName}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
