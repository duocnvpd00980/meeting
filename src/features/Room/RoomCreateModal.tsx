import { Button, Flex, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'
import { MdAddCard, MdLibraryAdd } from 'react-icons/md'
import { useRoomAPIs } from '../../hooks/useRoomAPIs'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'

const RoomCreateModal = () => {
  const { useInsertOne } = useRoomAPIs()
  const { mutate } = useInsertOne()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
    form.resetFields()
  }
  return (
    <>
      <Button
        type="primary"
        size="middle"
        onClick={() => setOpen(true)}
        icon={<MdLibraryAdd />}
      >
        Create room
      </Button>

      <Modal
        title="Create room"
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
          onFinish={(values) =>
            mutate([{ opt: '', ...values }], {
              onSuccess: () => {
                message.success('Meeting room created successfully!')
                queryClient.refetchQueries({
                  queryKey: [SERVICE.ROOM.READ],
                  type: 'active',
                })
              },
              onError: () => {
                message.error(
                  'Failed to create meeting room. Please try again later.',
                )
              },
            })
          }
        >
          <Form.Item
            label="Room Name"
            name="name"
            rules={[
              { required: true, message: 'Please input the room name!' },
              { type: 'string', min: 3 },
            ]}
          >
            <Input />
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
            <Input />
          </Form.Item>

          <Flex align="flex-end" justify="flex-end">
            <Button type="primary" htmlType="submit" icon={<MdAddCard />}>
              Create
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}

export default RoomCreateModal
