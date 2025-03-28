import styled, { css, DefaultTheme, keyframes } from "styled-components";
import { ToastType } from "../../../types";

const getToastStyles = ({
  toastType,
  theme,
}: {
  toastType: ToastType;
  theme: DefaultTheme;
}) => {
  const styles = {
    success: css`
      background: ${theme.colors.green};
      border-color: ${theme.colors.greenBorder};
    `,
    error: css`
      background: ${theme.colors.red};
      border-color: ${theme.colors.redBorder};
    `,
    info: css`
      background: ${theme.colors.blue};
      border-color: ${theme.colors.blueBorder};
    `,
    warning: css`
      background: ${theme.colors.amber};
      border-color: ${theme.colors.amberBorder};
    `,
    default: css`
      background: ${theme.colors.gray};
      border-color: ${theme.colors.grayBorder};
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
  $toastType: ToastType;
}>`
  z-index: 9999;
  display: flex;
  width: 100%;
  max-width: 28rem;
  align-items: flex-start;
  gap: 0.75rem;
  border-radius: 0.5rem; /* rounded-lg */
  border-width: 1px;
  border-style: solid;
  padding: 1rem; /* p-4 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  cursor: ${({ $isDragging, draggable }) =>
    $isDragging ? "grabbing" : draggable ? "grab" : "default"};
  opacity: ${({ opacity }) => opacity};
  transform: ${({ transform }) => transform};
  transition: ${({ $isDragging }) =>
    $isDragging ? "none" : "all 0.3s ease-in-out"};
  animation: ${fadeIn} 0.3s ease-out;

  ${({ $toastType = "default", theme }) =>
    getToastStyles({ toastType: $toastType, theme })}
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;

  svg {
    width: 1.25rem; /* w-5 */
    height: 1.25rem; /* h-5 */
  }
`;

export const Content = styled.div`
  flex: 1;

  h3 {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.foreground};
  }

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;

export const CloseButton = styled.button`
  flex-shrink: 0;
  border-radius: 9999px;
  padding: 0.25rem;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;
