'use client';
import { AuthRequest, signIn } from '@/lib/api';
import { User, UserModel, setUser } from '@/state/reducers/project';
import { saveToken } from '@/lib/utils';
import { AppDispatch } from '@/state';
import { setAuthenticated } from '@/state/reducers/authReducer';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<AuthRequest>['onFinish'] = body => {
    signIn(body)
      .then(res => {
        if (res) {
          const { token, user } = res;
          if (token) {
            saveToken(token);
            dispatch(setAuthenticated(true));
            dispatch(setUser(new User(user)));
            router.push('/mktp/home');
          }
        }
      })
      .catch(err => console.log(err));
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
            <Form.Item<AuthRequest> label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input size="large" addonBefore={<UserOutlined />} placeholder="email" />
            </Form.Item>

            <Form.Item<AuthRequest> label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password size="large" addonBefore={<LockOutlined />} />
            </Form.Item>

            <Form.Item>
              <Form.Item valuePropName="checked" noStyle></Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item className="w-full mb-8">
              <Button type="primary" htmlType="submit" size="large" className="w-full">
                Sign In
              </Button>
            </Form.Item>

            <Form.Item>
              <span>
                Don't have an account? <a href="/auth/register">Sign Up</a>
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
}
