import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'antd'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const BoxStyled = styled.div(() => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return css`
    background-color: ${colorBgContainer};
    border-radius: ${borderRadiusLG + 'px'};
    padding: 18px 42px 18px 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
})
const Toolbar = ({ children }: Props) => {
  return <BoxStyled>{children}</BoxStyled>
}

export default Toolbar
