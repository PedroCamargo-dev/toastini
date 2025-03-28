import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      green50: string;
      green200: string;
      red50: string;
      red200: string;
      blue50: string;
      blue200: string;
      amber50: string;
      amber200: string;
      gray50: string;
      gray200: string;
      muted: string;
      mutedForeground: string;
    };
  }
}
