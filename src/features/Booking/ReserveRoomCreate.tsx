import { Button, message } from 'antd'
import { useManagerStores } from '../../hooks/useManagerStores'
import { useBookingAPIs } from '../../hooks/useBookingAPIs'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'
import ReserveRoomComment from './ReserveRoomComment'
import { useTranslation } from 'react-i18next'

const ReserveRoomCreate = () => {
  const { useInsertMany } = useBookingAPIs()
  const { t } = useTranslation()
  const { reserveRoom, clearReserveRoom } = useManagerStores()
  const [invalid, setInvalid] = useState<boolean>(true)
  const [comment, setComment] = useState<object>()
  const { mutate, isPending } = useInsertMany()
  let reserve: any = reserveRoom()
  reserve = { ...reserve, ...comment }

  const queryClient = useQueryClient()
  useEffect(() => {
    if (
      'rId' in reserve &&
      'uId' in reserve &&
      'bTimeStart' in reserve &&
      'bTimeEnd' in reserve &&
      'bDate' in reserve &&
      'bTimeEnd' in reserve
    ) {
      setInvalid(false)
    }
  }, [reserve])

  const handleBookRoom = () => {
    mutate([reserve], {
      onSuccess: () => {
        clearReserveRoom()
        setInvalid(true)
        message.success(t('message.successfully-booking'))
        queryClient.refetchQueries({
          queryKey: [SERVICE.BOOKING.CALENDAR],
          type: 'active',
        })
      },
      onError: () => {
        message.error('booking failed')
      },
    })
  }
  return (
    <>
      <ReserveRoomComment invalid={invalid} setComment={setComment} />
      <Button
        type="primary"
        onClick={handleBookRoom}
        loading={isPending}
        disabled={invalid}
      >
        {t('booking.book-room')}
      </Button>
    </>
  )
}

export default ReserveRoomCreate
