import { Button, Flex, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'
import { MdAddCard, MdLibraryAdd } from 'react-icons/md'
import { useUserAPIs } from '../../hooks/useUserAPIs'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'
import { useTranslation } from 'react-i18next'
import { schemaEmail, schemaTeam, schemaUsername } from '../../validationSchema'

const UserCreateModal = () => {
  const { useInsertOne } = useUserAPIs()
  const { mutate } = useInsertOne()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const handleFinish = (values: any) =>
    mutate([values], {
      onSuccess: () => {
        setOpen(false)
        queryClient.refetchQueries({
          queryKey: [SERVICE.USER.READ],
          type: 'active',
        })
        message.success(t('message.meeting-successfully'))
      },
      onError: () => {
        message.error(t('message.meeting-failed'))
      },
    })
  const handleCancel = () => {
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
        {t('user.create-user')}
      </Button>
      <Modal
        title={t('user.create-user')}
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
            <Button type="primary" htmlType="submit" icon={<MdAddCard />}>
              {t('action.create')}
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}

export default UserCreateModal
