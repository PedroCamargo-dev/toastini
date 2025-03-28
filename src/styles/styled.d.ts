import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      green: string;
      greenBorder: string;
      greenDarkBorder?: string;

      red: string;
      redBorder: string;
      redDarkBorder?: string;

      blue: string;
      blueBorder: string;
      blueDarkBorder?: string;

      amber: string;
      amberBorder: string;
      amberDarkBorder?: string;

      gray: string;
      grayBorder: string;
      grayDarkBorder?: string;

      foreground: string;
      muted: string;
      mutedForeground: string;
    };
  }
}
