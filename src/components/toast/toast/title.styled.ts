import styled from 'styled-components'

export const Title = styled.h3`
  font-weight: 600;
  font-size: 1rem;

  ${(props) => ({ ...props.style })}
`
