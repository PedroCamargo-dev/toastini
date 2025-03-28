import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";

const getTypeStyles = ($type: keyof typeof theme.colors) => css`
  background-color: ${theme.colors[$type].light.background};
  border-color: ${theme.colors[$type].light.border};
  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors[$type].dark.background};
    border-color: ${theme.colors[$type].dark.border};
  }
`;

export const ToastContainer = styled.div<{
  $type: keyof typeof theme.colors;
  $isDragging: boolean;
  $draggable: boolean;
  $transform: string;
  $opacity: number;
  $isDraggingNow: boolean;
}>`
  z-index: 9999;
  display: flex;
  width: 100%;
  max-width: 28rem;
  align-items: flex-start;
  gap: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  cursor: ${(props) =>
    props.$isDragging ? "grabbing" : props.$draggable ? "grab" : "default"};
  transform: ${(props) => props.$transform};
  opacity: ${(props) => props.$opacity};
  transition: ${(props) =>
    props.$isDraggingNow ? "none" : "all 0.3s ease-in-out"};

  ${(props) => getTypeStyles(props.$type)}
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
`;

export const ContentWrapper = styled.div`
  flex: 1 1 0%;
`;

export const Title = styled.h3`
  font-weight: 500;
`;

export const Description = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(240 3.8% 46.1%);
  @media (prefers-color-scheme: dark) {
    color: hsl(240 4.8% 85%);
  }
`;

const getCloseButtonHoverStyles = ($type: keyof typeof theme.colors) => css`
  &:hover {
    color: ${theme.colors[$type].light.border};
    background-color: ${theme.colors[$type].light.background};
  }
  @media (prefers-color-scheme: dark) {
    &:hover {
      color: ${theme.colors[$type].dark.border};
      background-color: ${theme.colors[$type].dark.background};
    }
  }
`;

export const CloseButton = styled.button<{
  $type: keyof typeof theme.colors;
}>`
  flex-shrink: 0;
  border-radius: 9999px;
  padding: 0.25rem;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  ${(props) => getCloseButtonHoverStyles(props.$type)}
`;
