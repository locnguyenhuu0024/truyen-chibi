import React from 'react';
import { Form, Input, Space, Divider, Button, Row } from 'antd';
import { UserLogin } from '../../../../types/User';
import { SocialLoginMethodColor } from '../../../../styles/palette';
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

interface AuthenLoginFormProps {
  onFinish: (values: UserLogin) => void
  signInWithFacebook?: () => void
  signInWithGoogle?: () => void
}

export const AuthenLoginForm: React.FC<AuthenLoginFormProps> = observer(({ 
  onFinish, 
  signInWithFacebook, 
  signInWithGoogle 
}) => {
  return (
    <Space direction='vertical' style={{width: '100%'}}>
      <Form layout='vertical' name="login" onFinish={onFinish}>
        <Form.Item 
          label="Email" name="email" 
          rules={[{ required: true, type: 'email', message: 'Không được bỏ trống email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          label="Mật khẩu" name="password" 
          rules={[{ required: true, message: 'Không được bỏ trống mật khẩu' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Row justify={'space-between'}>
            <Button htmlType='button' type='link'>Quên mật khẩu?</Button>
            <Button htmlType='submit' type='primary'>Đăng nhập</Button>
          </Row>
        </Form.Item>
      </Form>
      <Divider>Hoặc</Divider>
      <Button 
        icon={<FacebookFilled />}
        style={{width: '100%', backgroundColor: SocialLoginMethodColor.Facebook}} 
        type='primary'
        onClick={signInWithFacebook}
      >Đăng nhập với Facebook</Button>
      <Button 
        icon={<GoogleOutlined />}
        style={{width: '100%', backgroundColor: SocialLoginMethodColor.Google}} 
        type='primary'
        onClick={signInWithGoogle}
      >Đăng nhập với Google</Button>
    </Space>
  );
});
