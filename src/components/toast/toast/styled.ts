import styled, { css, keyframes } from "styled-components";
import { ToastType } from "../../../types";

const getToastStyles = ({
  toastType,
  theme,
}: {
  toastType: ToastType;
  theme: { mode: "light" | "dark"; colors: Record<string, string> };
}) => {
  const styles = {
    success: css`
      background: ${theme.mode === "dark"
        ? theme.colors.green950 + "4D" // 30% opacity
        : theme.colors.green50};
      border-color: ${theme.mode === "dark"
        ? theme.colors.green800
        : theme.colors.green200};
    `,
    error: css`
      background: ${theme.mode === "dark"
        ? theme.colors.red950 + "4D"
        : theme.colors.red50};
      border-color: ${theme.mode === "dark"
        ? theme.colors.red800
        : theme.colors.red200};
    `,
    info: css`
      background: ${theme.mode === "dark"
        ? theme.colors.blue950 + "4D"
        : theme.colors.blue50};
      border-color: ${theme.mode === "dark"
        ? theme.colors.blue800
        : theme.colors.blue200};
    `,
    warning: css`
      background: ${theme.mode === "dark"
        ? theme.colors.amber950 + "4D"
        : theme.colors.amber50};
      border-color: ${theme.mode === "dark"
        ? theme.colors.amber800
        : theme.colors.amber200};
    `,
    default: css`
      background: ${theme.mode === "dark"
        ? theme.colors.gray900 + "4D"
        : theme.colors.gray50};
      border-color: ${theme.mode === "dark"
        ? theme.colors.gray800
        : theme.colors.gray200};
    `,
  };

  return styles[toastType] || styles.default;
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ToastContainer = styled.div<{
  $isDragging: boolean;
  draggable: boolean;
  transform: string;
  opacity: number;
  toastType: ToastType;
}>`
  z-index: 9999;
  display: flex;
  width: 100%;
  max-width: 28rem;
  align-items: flex-start;
  gap: 0.75rem;
  border-radius: 0.5rem;
  border-width: 1px;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: ${({ $isDragging, draggable }) =>
    $isDragging ? "grabbing" : draggable ? "grab" : "default"};
  opacity: ${({ opacity }) => opacity};
  transform: ${({ transform }) => transform};
  transition: ${({ $isDragging }) =>
    $isDragging ? "none" : "all 0.3s ease-in-out"};
  animation: ${fadeIn} 0.3s ease-out;

  ${({ toastType = "default", theme }) => getToastStyles({ toastType, theme })}
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const Content = styled.div`
  flex: 1;

  h3 {
    font-weight: 500;
  }

  div {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.mutedForeground || "#6b7280"};
  }
`;

export const CloseButton = styled.button`
  flex-shrink: 0;
  border-radius: 9999px;
  padding: 0.25rem;

  &:hover {
    background: ${({ theme }) => theme.colors.muted || "#f3f4f6"};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;
