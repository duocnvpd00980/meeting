import { Button, message } from 'antd'
import { MdDelete } from 'react-icons/md'
import { useBookingAPIs } from '../../hooks/useBookingAPIs'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'

interface Props {
  id: string
}
const BookedDelete = ({ id }: Props) => {
  const { useDeleteOne } = useBookingAPIs()
  const { mutate, isPending } = useDeleteOne()
  const queryClient = useQueryClient()
  const handleBookedDelete = () => {
    mutate(id, {
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
    <Button
      loading={isPending}
      onClick={handleBookedDelete}
      icon={<MdDelete />}
    >
      Delete
    </Button>
  )
}

export default BookedDelete
