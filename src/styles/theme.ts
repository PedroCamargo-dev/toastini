import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  mode: "light",
  colors: {
    // Toast background + borders
    green: "#f0fdf4",
    greenBorder: "#bbf7d0",
    greenDarkBorder: "#166534",

    red: "#fef2f2",
    redBorder: "#fecaca",
    redDarkBorder: "#b91c1c",

    blue: "#eff6ff",
    blueBorder: "#bfdbfe",
    blueDarkBorder: "#1e40af",

    amber: "#fffbeb",
    amberBorder: "#fde68a",
    amberDarkBorder: "#92400e",

    gray: "#f9fafb",
    grayBorder: "#e5e7eb",
    grayDarkBorder: "#1f2937",

    // Texts
    foreground: "#0f172a",
    muted: "#f3f4f6",
    mutedForeground: "#6b7280",
  },
};

export const darkTheme: DefaultTheme = {
  mode: "dark",
  colors: {
    green: "rgba(5, 46, 22, 0.3)",
    greenBorder: "#16a34a",

    red: "rgba(69, 10, 10, 0.3)",
    redBorder: "#ef4444",

    blue: "rgba(23, 37, 84, 0.3)",
    blueBorder: "#60a5fa",

    amber: "rgba(69, 26, 3, 0.3)",
    amberBorder: "#fbbf24",

    gray: "rgba(17, 24, 39, 0.3)",
    grayBorder: "#9ca3af",

    foreground: "#d1d5db",
    muted: "#1f2937",
    mutedForeground: "#9ca3af",
  },
};
