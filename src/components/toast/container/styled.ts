import styled from "styled-components";

export const StyledToastWrapper = styled.div<{
  positionStyle: React.CSSProperties;
}>`
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* gap-2 */
  padding: 1rem; /* p-4 */
  max-height: 100vh;

  ${({ positionStyle }) => positionStyle && { ...positionStyle }}
`;

export const ToastItemWrapper = styled.div`
  pointer-events: auto;
`;
