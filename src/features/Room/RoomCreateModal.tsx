import { Button, Flex, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'
import { MdAddCard, MdLibraryAdd } from 'react-icons/md'
import { useRoomAPIs } from '../../hooks/useRoomAPIs'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'
import { useTranslation } from 'react-i18next'
import { schemaRoomName, schemaRoomSeats } from '../../validationSchema'

const RoomCreateModal = () => {
  const { useInsertOne } = useRoomAPIs()
  const { mutate } = useInsertOne()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const { t } = useTranslation('ns1')
  const queryClient = useQueryClient()
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }
  const handleFinish = (values: any) =>
    mutate([{ opt: '', ...values }], {
      onSuccess: () => {
        setOpen(false)
        queryClient.refetchQueries({
          queryKey: [SERVICE.ROOM.READ],
          type: 'active',
        })
        message.success(t('message.meeting-successfully'))
      },
      onError: () => {
        message.error(t('message.meeting-failed'))
      },
    })

  return (
    <>
      <Button
        type="primary"
        size="middle"
        onClick={() => setOpen(true)}
        icon={<MdLibraryAdd />}
      >
        {t('room.create-room')}
      </Button>
      <Modal
        title={t('room.create-room')}
        centered
        open={open}
        width={1000}
        footer={false}
        style={{ maxWidth: 600, padding: 0, margin: 0 }}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          colon={false}
          style={{ marginTop: 26 }}
          onFinish={(values) => handleFinish(values)}
        >
          <Form.Item
            label={t('room.room-Name')}
            name="name"
            rules={schemaRoomName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('room.seats-number')}
            name="seat"
            rules={schemaRoomSeats}
          >
            <Input />
          </Form.Item>
          <Flex align="flex-end" justify="flex-end">
            <Button type="primary" htmlType="submit" icon={<MdAddCard />}>
              {t('action.create')}
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}

export default RoomCreateModal
