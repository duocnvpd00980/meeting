import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  horizontal?: boolean
}
const PanelStyle = styled.div(
  ({ horizontal }: { horizontal: boolean }) => css`
    border: 1px solid red;
    margin: 0 0 16px;
    background-color: #ffffff;
    border: 1px solid rgba(5, 5, 5, 0.06);
    border-radius: 8px;
    padding: 38px 24px 38px;
    color: rgba(0, 0, 0, 0.88);
    min-height: 90vh;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    ${horizontal &&
    css`
      display: flex;
    `}
  `,
)
const Panel = ({ children, horizontal }: Props) => {
  return <PanelStyle horizontal={!!horizontal}>{children}</PanelStyle>
}

export default Panel
