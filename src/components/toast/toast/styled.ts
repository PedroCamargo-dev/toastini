import styled, { css } from "styled-components";
import { ToastType } from "../../../types";

export const ToastContainer = styled.div<{
  isDragging: boolean;
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
  transition: all 0.3s ease-in-out;
  cursor: ${({ isDragging, draggable }) =>
    isDragging ? "grabbing" : draggable ? "grab" : "default"};
  opacity: ${({ opacity }) => opacity};
  transform: ${({ transform }) => transform};

  ${({ toastType, theme }) => {
    const styles = {
      success: css`
        background: ${theme.colors.green50 || "#f0fdf4"};
        border-color: ${theme.colors.green200 || "#bbf7d0"};
      `,
      error: css`
        background: ${theme.colors.red50 || "#fef2f2"};
        border-color: ${theme.colors.red200 || "#fecaca"};
      `,
      info: css`
        background: ${theme.colors.blue50 || "#eff6ff"};
        border-color: ${theme.colors.blue200 || "#bfdbfe"};
      `,
      warning: css`
        background: ${theme.colors.amber50 || "#fffbeb"};
        border-color: ${theme.colors.amber200 || "#fde68a"};
      `,
      default: css`
        background: ${theme.colors.gray50 || "#f9fafb"};
        border-color: ${theme.colors.gray200 || "#e5e7eb"};
      `,
    };
    return styles[toastType] || styles.default;
  }}
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
