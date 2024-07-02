import { Button, Flex, Form, Input, Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { IoIosSave } from 'react-icons/io'
import { useManagerStores } from '../../hooks/useManagerStores'
import { useUserAPIs } from '../../hooks/useUserAPIs'
import { IFieldUser } from '../../services/userService'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'
import { useTranslation } from 'react-i18next'
import { schemaEmail, schemaTeam, schemaUsername } from '../../validationSchema'

const UserUpdateModal = () => {
  const { t } = useTranslation('ns1')
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
  }, [user])
  const handleFinish = (values: IFieldUser) => {
    if (
      user.userName === values.name &&
      user.userEmail === values.email &&
      user.userDep === values.dep
    ) {
      message.info(t('message.no-changes'))
      return
    }
    const dataForm = { ...values, uId: user.userID }
    return mutate([dataForm], {
      onSuccess: () => {
        setOpen(false)
        queryClient.refetchQueries({
          queryKey: [SERVICE.USER.READ],
          type: 'active',
        })
        message.success(t('message.meeting-successfully'))
        clearUserId()
      },
      onError: () => {
        message.error(t('message.meeting-failed'))
      },
    })
  }
  const handleCancel = () => {
    setOpen(false)
    clearUserId()
    form.resetFields()
  }
  if (!user.userID) return
  return (
    <Modal
      title={t('user.update-user')}
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
          label={t('user.user-name')}
          name="name"
          rules={schemaUsername}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t('user.email')} name="email" rules={schemaEmail}>
          <Input />
        </Form.Item>
        <Form.Item label={t('user.team')} name="dep" rules={schemaTeam}>
          <Input />
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

export default UserUpdateModal
