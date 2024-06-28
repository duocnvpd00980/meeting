import styled from '@emotion/styled'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const BoxStyle = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  position: relative;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ContentStyled = styled.div`
  max-width: 30rem;
  width: 100%;
  padding: 2.875rem;
  background-color: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(5, 5, 5, 0.06);
  border-radius: 0.375rem;
`

const BoxFix = ({ children }: Props) => {
  return (
    <BoxStyle>
      <ContentStyled>{children}</ContentStyled>
    </BoxStyle>
  )
}

export default BoxFix
