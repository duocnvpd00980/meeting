import { Button, Form, Input, Typography } from 'antd'
import { AiOutlineLogin } from 'react-icons/ai'
import { MdOutlineEmail } from 'react-icons/md'
import BoxFix from '../../components/BoxFix'
import useLogin from '../../hooks/useLogin'
import { useLoginAPI } from '../../hooks/useLoginAPI'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { schemaLogin } from '../../validationSchema'

const { Title } = Typography

const Login: React.FC = () => {
  const { onSubmit } = useLogin()
  const [form] = Form.useForm()
  const { mutate, isPending } = useLoginAPI()
  const { t } = useTranslation('ns1')
  useEffect(() => {
    form.resetFields()
  }, [])

  return (
    <BoxFix>
      <Title>{t('login')}</Title>
      <Form form={form} onFinish={onSubmit(mutate)} autoComplete="off">
        <Form.Item name="email" rules={schemaLogin}>
          <Input size="large" placeholder="Email" prefix={<MdOutlineEmail />} />
        </Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={isPending}
          icon={<AiOutlineLogin />}
        >
          {t('login')}
        </Button>
      </Form>
    </BoxFix>
  )
}

export default Login
