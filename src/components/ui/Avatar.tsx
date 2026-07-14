interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: number;
}

/** Initials avatar — no per-user images in the dataset, so we render initials on brand color. */
export function Avatar({ firstName, lastName, size = 44 }: AvatarProps) {
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--brand, #377dff)",
        color: "#fff",
        fontWeight: 600,
        fontSize: size * 0.4,
        flexShrink: 0,
      }}
    >
      {initials}
    </span>
  );
}
