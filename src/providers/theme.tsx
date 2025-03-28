import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";

const ToastProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export { ToastProvider };
