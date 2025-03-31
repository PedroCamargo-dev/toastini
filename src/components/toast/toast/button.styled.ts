import styled, { css, IThemeToast } from 'styled-components'

const getCloseButtonHoverStyles = ($type: keyof IThemeToast['colors']) => css`
  &:hover {
    background-color: ${({ theme }) => theme.colors[$type].border};
    color: ${({ theme }) => theme.colors[$type].text};
    opacity: 0.8;
  }
`

export const CloseButton = styled.button<{
  $type: keyof IThemeToast['colors']
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
  ${(props) => ({ ...props.style })}
`
