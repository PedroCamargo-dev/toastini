import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      green50: string;
      green200: string;
      green800: string;
      green950: string;
      red50: string;
      red200: string;
      red800: string;
      red950: string;
      blue50: string;
      blue200: string;
      blue800: string;
      blue950: string;
      amber50: string;
      amber200: string;
      amber800: string;
      amber950: string;
      gray50: string;
      gray200: string;
      gray800: string;
      gray900: string;
      muted: string;
      mutedForeground: string;
    };
  }
}
