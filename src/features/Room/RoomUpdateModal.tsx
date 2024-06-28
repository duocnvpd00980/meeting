import { Button, Flex, Form, Input, Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { IoIosSave } from 'react-icons/io'
import { useRoomAPIs } from '../../hooks/useRoomAPIs'
import { IFieldRoom } from '../../services/roomService'
import { useManagerStores } from '../../hooks/useManagerStores'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'

const RoomUpdateModal = () => {
  const [open, setOpen] = useState(false)
  const { roomId, clearRoomId } = useManagerStores()
  const [form] = Form.useForm()
  const { useUpdateOne } = useRoomAPIs()
  const { mutate } = useUpdateOne()
  const queryClient = useQueryClient()
  const room = roomId()
  useEffect(() => {
    if (room.roomID) {
      form.setFieldValue('name', room.roomName)
      form.setFieldValue('seat', room.roomSeat)
      setOpen(true)
    }
  }, [room, form])
  const handleFinish = (values: IFieldRoom) => {
    if (room.roomName === values.name && room.roomSeat === values.seat) {
      message.info(
        'No changes have been made. Please update the information before saving.',
      )
      return
    }
    const dataForm = { ...values, rId: room.roomID, opt: 'Nan' }
    return mutate([dataForm], {
      onSuccess: () => {
        message.success('Meeting room created successfully!')
        queryClient.refetchQueries({
          queryKey: [SERVICE.ROOM.READ],
          type: 'active',
        })
      },
      onError: () => {
        message.error('Failed to create meeting room. Please try again later.')
      },
    })
  }
  const handleCancel = () => {
    setOpen(false)
    clearRoomId()
  }
  if (!room.roomID) return
  return (
    <Modal
      title="Update room"
      centered
      open={open}
      width={1000}
      footer={false}
      style={{ maxWidth: 600, padding: 0, margin: 0 }}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="roomUpdate"
        layout="vertical"
        colon={false}
        style={{ marginTop: 26 }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Room Name"
          name="name"
          rules={[
            { required: true, message: 'Please input the room name!' },
            { type: 'string', min: 3 },
          ]}
        >
          <Input value="1212123" />
        </Form.Item>

        <Form.Item
          label="Seats Number"
          name="seat"
          rules={[
            { required: true, message: 'Please input the number of seats!' },
            {
              type: 'number',
              min: 1,
              max: 50,
              message: 'Seats number must be between 1 and 50',
              transform: (value) => {
                return isNaN(Number(value)) ? 0 : Number(value)
              },
            },
          ]}
        >
          <Input value="1212123" />
        </Form.Item>

        <Flex align="flex-end" justify="flex-end">
          <Button type="primary" htmlType="submit" icon={<IoIosSave />}>
            Save
          </Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default RoomUpdateModal
