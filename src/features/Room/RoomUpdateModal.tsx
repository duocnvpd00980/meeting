import { Button, Flex, Form, Input, Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { IoIosSave } from 'react-icons/io'
import { useRoomAPIs } from '../../hooks/useRoomAPIs'
import { IFieldRoom } from '../../services/roomService'
import { useManagerStores } from '../../hooks/useManagerStores'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'
import { useTranslation } from 'react-i18next'
import { schemaRoomName, schemaRoomSeats } from '../../validationSchema'

const RoomUpdateModal = () => {
  const { t } = useTranslation('ns1')
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
  }, [room])

  const handleFinish = (values: IFieldRoom) => {
    if (room.roomName === values.name && room.roomSeat === values.seat) {
      message.info(t('message.no-changes'))
      return
    }
    const dataForm = { ...values, rId: room.roomID, opt: 'Nan' }
    return mutate([dataForm], {
      onSuccess: () => {
        setOpen(false)
        queryClient.refetchQueries({
          queryKey: [SERVICE.ROOM.READ],
          type: 'active',
        })
        message.success(t('message.meeting-successfully'))
        clearRoomId()
      },
      onError: () => {
        message.error(t('message.meeting-failed'))
      },
    })
  }
  const handleCancel = () => {
    setOpen(false)
    clearRoomId()
    form.resetFields()
  }
  if (!room.roomID) return
  return (
    <Modal
      title={t('room.update-room')}
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
          label={t('room.room-Name')}
          name="name"
          rules={schemaRoomName}
        >
          <Input value="" />
        </Form.Item>

        <Form.Item
          label={t('room.seats-number')}
          name="seat"
          rules={schemaRoomSeats}
        >
          <Input value="" />
        </Form.Item>

        <Flex align="flex-end" justify="flex-end">
          <Button type="primary" htmlType="submit" icon={<IoIosSave />}>
            {t('action.save')}
          </Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default RoomUpdateModal
