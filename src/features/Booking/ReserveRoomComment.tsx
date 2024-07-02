import { Input } from 'antd'
import _ from 'lodash'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
const { TextArea } = Input

interface Props {
  invalid: boolean
  setComment: (value: object) => void
}

const ReserveRoomComment = ({ invalid, setComment }: Props) => {
  const { t } = useTranslation('ns1')
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
      placeholder={t('booking.comment')}
      maxLength={400}
      onChange={(e) => handleChangeTextArea(e.target.value)}
      disabled={invalid}
    />
  )
}

export default ReserveRoomComment
