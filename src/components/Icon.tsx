type Name = "arrow-right" | "arrow-up-right" | "download" | "mail" | "github" | "phone" | "copy" | "menu" | "close" | "arrow-left";

const paths: Record<Name, string> = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-left": "M19 12H5M11 6l-6 6 6 6",
  "arrow-up-right": "M7 17 17 7M8 7h9v9",
  download: "M12 4v11M7 10l5 5 5-5M5 20h14",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M6.6 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z",
  copy: "M9 9h10v10H9zM5 15V5h10",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  github:
    "M12 3a9 9 0 0 0-2.85 17.54c.45.08.62-.2.62-.43v-1.6c-2.5.54-3.03-1.06-3.03-1.06-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.07 1.38.93 1.38.93.8 1.38 2.11.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.1-.23-.4-1.14.08-2.38 0 0 .76-.24 2.47.92a8.6 8.6 0 0 1 4.5 0c1.71-1.16 2.47-.92 2.47-.92.49 1.24.18 2.15.09 2.38.58.63.92 1.44.92 2.42 0 3.46-2.1 4.22-4.1 4.44.32.28.61.83.61 1.67v2.48c0 .24.16.52.62.43A9 9 0 0 0 12 3Z",
};

export function Icon({ name, size = 18 }: { name: Name; size?: number }) {
  const filled = name === "github";
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
