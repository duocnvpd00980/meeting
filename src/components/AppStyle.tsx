import styled from '@emotion/styled'
import { Layout } from 'antd'
import { ReactNode } from 'react'

const AppStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #dfdfdf;
`
const LayoutStyled = styled(Layout)`
  box-sizing: border-box;
  display: flex;
  background-color: green;
`

interface Props {
  children: ReactNode
}
const AppStyle = ({ children }: Props) => {
  return (
    <AppStyled>
      <LayoutStyled>{children}</LayoutStyled>
    </AppStyled>
  )
}

export default AppStyle
