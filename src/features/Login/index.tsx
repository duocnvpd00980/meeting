import { Button, Form, Input, Typography } from 'antd'
import { AiOutlineLogin } from 'react-icons/ai'
import { MdOutlineEmail } from 'react-icons/md'
import BoxFix from '../../components/BoxFix'
import useLogin from '../../hooks/useLogin'
import { useLoginAPI } from '../../hooks/useLoginAPI'

const { Title } = Typography

const Login: React.FC = () => {
  const { onSubmit } = useLogin()
  const [form] = Form.useForm()
  const { mutate, isPending } = useLoginAPI()
  return (
    <BoxFix>
      <Title>Login</Title>
      <Form form={form} onFinish={onSubmit(mutate)} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email address.' },
            { type: 'email', message: 'Your email is valid.' },
          ]}
        >
          <Input size="large" placeholder="Email" prefix={<MdOutlineEmail />} />
        </Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={isPending}
          icon={<AiOutlineLogin />}
        >
          Login
        </Button>
      </Form>
    </BoxFix>
  )
}

export default Login
