import { Button, Modal, Row } from "antd"
import '../rightField.css'
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { AuthenGoogleForm } from "./AuthenGoogleForm";
import { useRootStore } from "../../../../stores";
import { CustomizeTitle } from "../../../Customizes";

export const AuthenOnlyGoogleField : React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {authStore} = useRootStore()
  const { loginWithGoogle } = authStore

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <Row justify={'end'} align={'middle'} style={{height: 64}}>
      <Button 
        className="button login-google"
        type="default" 
        ghost
        onClick={showModal}
      >Đăng nhập</Button>
      <Modal 
        open={isModalOpen} 
        title={<CustomizeTitle title="Trải nghiệm tốt hơn khi đăng nhập" style={{textAlign: 'center', fontSize: 14}} />}
        footer={null}
        onCancel={handleCancel}
      >
        <AuthenGoogleForm signInWithGoogle={loginWithGoogle} />
      </Modal>
    </Row>
  )
})