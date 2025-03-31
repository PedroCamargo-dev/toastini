import styled, { css, DefaultTheme } from 'styled-components'

interface ToastContainerWrapperProps {
  $type: keyof DefaultTheme['colors']
  $isDragging: boolean
  $draggable: boolean
  $transform: string
  $opacity: number
  $isDraggingNow: boolean
}

const getTypeStyles = ($type: keyof DefaultTheme['colors']) => css`
  background-color: ${({ theme }) => theme.colors[$type].background};
  border-color: ${({ theme }) => theme.colors[$type].border};
  color: ${({ theme }) => theme.colors[$type].text};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const ToastContainerWrapper = styled.div<ToastContainerWrapperProps>`
  z-index: 9999;
  display: flex;
  width: 100%;
  max-width: 28rem;
  align-items: flex-start;
  gap: 0.75rem;
  border-radius: 1rem;
  border: 1px solid;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  cursor: ${(props) =>
    props.$isDragging ? 'grabbing' : props.$draggable ? 'grab' : 'default'};
  transform: ${(props) => props.$transform};
  opacity: ${(props) => props.$opacity};
  transition: ${(props) =>
    props.$isDraggingNow ? 'none' : 'all 0.3s ease-in-out'};

  ${(props) => getTypeStyles(props.$type)}
  ${(props) => ({ ...props.style })}
`
