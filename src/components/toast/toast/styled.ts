import styled, { css, DefaultTheme } from 'styled-components'

const getTypeStyles = ($type: keyof DefaultTheme['colors']) => css`
  background-color: ${({ theme }) => theme.colors[$type].background};
  border-color: ${({ theme }) => theme.colors[$type].border};
  color: ${({ theme }) => theme.colors[$type].text};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const ToastContainer = styled.div<{
  $type: keyof DefaultTheme['colors']
  $isDragging: boolean
  $draggable: boolean
  $transform: string
  $opacity: number
  $isDraggingNow: boolean
}>`
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
`

export const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const Title = styled.h3`
  font-weight: 600;
  font-size: 1rem;
`

export const Description = styled.div`
  font-size: 0.875rem;
  line-height: 1.4;
  opacity: 0.85;
`

const getCloseButtonHoverStyles = ($type: keyof DefaultTheme['colors']) => css`
  &:hover {
    background-color: ${({ theme }) => theme.colors[$type].border};
    color: ${({ theme }) => theme.colors[$type].text};
    opacity: 0.8;
  }
`

export const CloseButton = styled.button<{
  $type: keyof DefaultTheme['colors']
}>`
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  background: transparent;
  font-size: 1rem;

  ${(props) => getCloseButtonHoverStyles(props.$type)}
`
