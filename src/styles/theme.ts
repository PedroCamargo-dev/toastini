import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  mode: "light",
  colors: {
    green50: "#f0fdf4",
    green200: "#bbf7d0",
    red50: "#fef2f2",
    red200: "#fecaca",
    blue50: "#eff6ff",
    blue200: "#bfdbfe",
    amber50: "#fffbeb",
    amber200: "#fde68a",
    gray50: "#f9fafb",
    gray200: "#e5e7eb",
    mutedForeground: "#6b7280",
    muted: "#f3f4f6",
  },
};

export const darkTheme: DefaultTheme = {
  mode: "dark",
  colors: {
    green50: "#052e16",
    green200: "#166534",
    red50: "#450a0a",
    red200: "#b91c1c",
    blue50: "#1e3a8a",
    blue200: "#3b82f6",
    amber50: "#78350f",
    amber200: "#f59e0b",
    gray50: "#111827",
    gray200: "#374151",
    mutedForeground: "#9ca3af",
    muted: "#1f2937",
  },
};
