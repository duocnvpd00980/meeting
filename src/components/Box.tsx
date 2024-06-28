import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex } from 'antd'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  width?: number
}
const BoxStyed = styled(Flex)(
  ({ width }: Props) => css`
    background-color: rgba(0, 0, 0, 0.02);
    padding: 1.25rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    margin-top: 1.125rem;
    ${width && `width: ${width}px`}
  `,
)
const Box = ({ children, width }: Props) => {
  return (
    <BoxStyed width={width} gap={20} vertical>
      {children}
    </BoxStyed>
  )
}

export default Box
