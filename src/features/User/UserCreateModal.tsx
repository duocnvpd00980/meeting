import { Button, Flex, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'
import { MdAddCard, MdLibraryAdd } from 'react-icons/md'
import { useUserAPIs } from '../../hooks/useUserAPIs'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'

const UserCreateModal = () => {
  const { useInsertOne } = useUserAPIs()
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
        Create user
      </Button>

      <Modal
        title="Create user"
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
            mutate([values], {
              onSuccess: () => {
                message.success('Meeting room created successfully!')
                queryClient.refetchQueries({
                  queryKey: [SERVICE.USER.READ],
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
            label="User name"
            name="name"
            rules={[
              { required: true, message: 'Please input the user name!' },
              { type: 'string', min: 3 },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address.' },
              { type: 'email', message: 'Your email is valid.' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Team"
            name="dep"
            rules={[
              { required: true, message: 'Please input the team!' },
              { type: 'string', min: 1 },
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

export default UserCreateModal
