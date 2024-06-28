import { Input } from 'antd'
import _ from 'lodash'
import { useCallback } from 'react'
const { TextArea } = Input

interface Props {
  invalid: boolean
  setComment: (value: object) => void
}

const ReserveRoomComment = ({ invalid, setComment }: Props) => {
  const debouncedSave = useCallback(
    _.debounce((value) => {
      setComment({
        bComment: value,
      })
    }, 300),
    [],
  )
  const handleChangeTextArea = (value: string) => {
    debouncedSave(value)
  }
  return (
    <TextArea
      rows={4}
      placeholder="Comment"
      maxLength={400}
      onChange={(e) => handleChangeTextArea(e.target.value)}
      disabled={invalid}
    />
  )
}

export default ReserveRoomComment
