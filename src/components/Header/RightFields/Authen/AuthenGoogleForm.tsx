import React from 'react';
import { Button } from 'antd';
import { SocialLoginMethodColor } from '../../../../styles/palette';
import { GoogleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

interface AuthenGoogleFormProps {
  signInWithGoogle: () => void
}

export const AuthenGoogleForm: React.FC<AuthenGoogleFormProps> = observer(({ 
  signInWithGoogle 
}) => {
  return (
    <>
      <Button 
        icon={<GoogleOutlined />}
        style={{width: '100%', backgroundColor: SocialLoginMethodColor.Google}} 
        type='primary'
        onClick={signInWithGoogle}
      >Đăng nhập với Google</Button>
    </>
  );
});
