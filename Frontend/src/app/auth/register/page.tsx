'use client';
import { AuthRequest, signUp } from '@/lib/api';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { useRouter } from 'next/navigation';

type FieldType = {
  email: string;
  password: string;
  confirm_password: string;
  checked: boolean;
};

export default function Register() {
  const router = useRouter();
  const onFinish: FormProps<FieldType>['onFinish'] = formValue => {
    const { email, password, confirm_password } = formValue;
    if (password === confirm_password) {
      const body = { email, password };
      signUp(body)
        .then(res => {
          if (res) {
            const { token } = res;
            if (token) {
              router.push('/auth/login');
            }
          }
        })
        .catch(err => console.log(err));
    }
  };

  const onFinishFailed: FormProps<AuthRequest>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <main className="relative flex w-full h-full bg-[url('/images/landing/auth-bg.webp')] bg-cover bg-bottom">
      <div className="container mx-auto flex h-full items-center justify-center">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg py-16 px-8 flex flex-col items-center justify-center">
          <span className="font-bold text-2xl text-blue-primary mb-4">Welcome to Layline</span>
          <span className="text-lg text-blue-primary mb-4">The one-stop-stop platform for artists</span>

          <Form layout="vertical" className="w-[400px]" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <Form.Item<FieldType> label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input size="large" placeholder="email" />
            </Form.Item>

            <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item<FieldType> label="Confirm Password" name="confirm_password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item<FieldType>>
              <Form.Item valuePropName="checked" name="checked" noStyle>
                <Checkbox></Checkbox>
              </Form.Item>
              <span className="pl-2">By creating an account. you agree to our Terms of Service and Privacy Policy.</span>
            </Form.Item>

            <Form.Item>
              <span className="login-form-forgot px-2">
                Have an account? <a href="/auth/login"> Sign In</a>
              </span>
            </Form.Item>

            <Form.Item className="w-full">
              <Button type="primary" htmlType="submit" size="large" className="w-full">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
}
