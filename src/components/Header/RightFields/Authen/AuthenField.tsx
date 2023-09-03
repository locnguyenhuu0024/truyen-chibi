import { Button, Modal, Row, Space } from "antd"
import { BrightColorPalette } from "../../../../styles/palette"
import '../rightField.css'
import { useState } from "react";
import { AuthenForm } from "./AuthenForm";
import { observer } from "mobx-react-lite";

export const AuthenField : React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <Row justify={'end'} align={'middle'}>
      <Space>
        <Button 
          className="button login"
          type="default" 
          ghost
          onClick={showModal}
        >Đăng nhập</Button>
        <Button 
          className="button signup"
          style={{backgroundColor: BrightColorPalette.Accent}}
          type="primary" 
          danger
          onClick={showModal}
        >Đăng ký</Button>
      </Space>
      <Modal 
        open={isModalOpen} 
        footer={null}
        onCancel={handleCancel}
      >
        <Row justify={'center'}>
          <AuthenForm />
        </Row>
      </Modal>
    </Row>
  )
})