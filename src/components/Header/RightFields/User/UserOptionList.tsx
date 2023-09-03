import { BookOutlined, InfoCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import { observer } from "mobx-react-lite";

type UserOptionListProps = {
  signOut: () => void,
}

const optionList = [
  {
    id: 'Thông tin tài khoản',
    type: 'defailt',
    title: 'Thông tin tài khoản',
    icon: <InfoCircleOutlined />
  },
  {
    id: 'Truyện yêu thích',
    type: 'defailt',
    title: 'Truyện yêu thích',
    icon: <BookOutlined />
  },
  {
    id: 'Đăng xuất',
    type: 'logout',
    title: 'Đăng xuất',
    icon: <LogoutOutlined />
  },
];

export const UserOptionList : React.FC<UserOptionListProps> = observer(({signOut}) => {
  return (
    <List 
      dataSource={optionList}
      itemLayout="vertical"
      renderItem={(option) => (
        <div key={option.id}>
          {
            option.type === 'logout'
              ? <Button 
                type="link" 
                icon={option.icon}
                onClick={signOut}
              >{option.title}</Button>
              : <Button 
                type="link" 
                icon={option.icon}
                href="#"
              >{option.title}</Button>
          }
        </div>
      )}
    />
  )
})