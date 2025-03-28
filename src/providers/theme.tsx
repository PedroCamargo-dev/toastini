import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";

interface ToastProviderProps {
  children: React.ReactNode;
  theme?: "light" | "dark";
}

const ToastProvider = ({ children, theme = "light" }: ToastProviderProps) => {
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>;
};

export { ToastProvider };
