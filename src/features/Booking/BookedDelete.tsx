import { Button, Popconfirm, message } from 'antd'
import { MdDelete } from 'react-icons/md'
import { useBookingAPIs } from '../../hooks/useBookingAPIs'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'
import { useTranslation } from 'react-i18next'

interface Props {
  bookedID: string
}
const BookedDelete = ({ bookedID }: Props) => {
  const { t } = useTranslation('ns1')
  const { useDeleteOne } = useBookingAPIs()
  const { mutate, isPending } = useDeleteOne()
  const queryClient = useQueryClient()
  const handleBookedDelete = () => {
    mutate(bookedID, {
      onSuccess: () => {
        message.success('delete success id')
        queryClient.refetchQueries({
          queryKey: [SERVICE.BOOKING.READ_ALL],
          type: 'active',
        })
      },
      onError: () => {
        message.error('delete error')
      },
    })
  }
  return (
    <Popconfirm
      title={t('delete-booking.title')}
      description={t('delete-booking.description')}
      onConfirm={handleBookedDelete}
      okText={t('delete-booking.yes')}
      cancelText={t('delete-booking.no')}
    >
      <Button loading={isPending} icon={<MdDelete />} danger>
        {t('action.delete')}
      </Button>
    </Popconfirm>
  )
}

export default BookedDelete
