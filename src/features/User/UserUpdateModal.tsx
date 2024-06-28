import { Button, Flex, Form, Input, Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { IoIosSave } from 'react-icons/io'
import { useManagerStores } from '../../hooks/useManagerStores'
import { useUserAPIs } from '../../hooks/useUserAPIs'
import { IFieldUser } from '../../services/userService'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'

const UserUpdateModal = () => {
  const [open, setOpen] = useState(false)
  const { userId, clearUserId } = useManagerStores()
  const [form] = Form.useForm()
  const { useUpdateOne } = useUserAPIs()
  const { mutate } = useUpdateOne()
  const queryClient = useQueryClient()
  const user = userId()
  useEffect(() => {
    if (user.userID) {
      form.setFieldValue('name', user.userName)
      form.setFieldValue('email', user.userEmail)
      form.setFieldValue('dep', user.userDep)
      setOpen(true)
    }
  }, [user, form])

  const handleFinish = (values: IFieldUser) => {
    if (
      user.userName === values.name &&
      user.userEmail === values.email &&
      user.userDep === values.dep
    ) {
      message.info(
        'No changes have been made. Please update the information before saving.',
      )
      return
    }
    const dataForm = { ...values, uId: user.userID }
    return mutate([dataForm], {
      onSuccess: () => {
        message.success('Meeting room created successfully!')
        queryClient.refetchQueries({
          queryKey: [SERVICE.USER.READ],
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
    clearUserId()
  }

  if (!user.userID) return

  return (
    <Modal
      title="Update user"
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
          <Button type="primary" htmlType="submit" icon={<IoIosSave />}>
            Save
          </Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default UserUpdateModal
