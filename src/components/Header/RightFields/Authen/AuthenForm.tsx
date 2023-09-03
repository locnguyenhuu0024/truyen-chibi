import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Row, Tabs } from "antd";
import { AuthenLoginForm } from "./AuthenLoginForm";
import { UserLogin } from "../../../../types/User";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../stores";

export const AuthenForm : React.FC = observer(() => {
  const {authStore} = useRootStore()
  const {
    loginWithEmailAndPassword,
    loginWithGoogle,
    loginWithFacebook
  } = authStore
  const handleLogin = async (user: UserLogin) => {
    await loginWithEmailAndPassword(user)
  };


  
  return (
    <Row justify={"center"} align={'middle'} style={{width: '80%'}}>
      <Tabs
        style={{width: '100%'}}
        defaultActiveKey="1"
        tabPosition='top'
        items={[LoginOutlined, UserAddOutlined].map((Icon, i) => {
          const id = String(i + 1);
    
          return {
            label: (
              <span>
                <Icon />
                { i+1 === 1 ? 'Đăng nhập' : 'Đăng ký' }
              </span>
            ),
            key: id,
            children: i+1 === 1 
              ? <AuthenLoginForm 
                onFinish={handleLogin}
                signInWithGoogle={loginWithGoogle}
                signInWithFacebook={loginWithFacebook}
              /> 
              : <AuthenLoginForm onFinish={handleLogin}/>,
          };
        })}
      />
    </Row>
  )
})