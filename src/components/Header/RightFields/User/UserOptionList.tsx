import { BookOutlined, InfoCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RouteComicEnums } from "../../../../types/Route";

type UserOptionListProps = {
  signOut: () => void,
  onClickItemMenu: () => void,
  closeUserField: () => void,
}

const optionList = [
  {
    id: 'Thông tin tài khoản',
    type: 'defailt',
    title: 'Thông tin tài khoản',
    icon: <InfoCircleOutlined />
  },
  {
    id: RouteComicEnums.FavoriteComics,
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

export const UserOptionList : React.FC<UserOptionListProps> = observer(({signOut, onClickItemMenu, closeUserField}) => {
  const closeAll = () => {
    onClickItemMenu()
    closeUserField()
  }
  return (
    <List 
      dataSource={optionList}
      itemLayout="vertical"
      renderItem={(option) => (
        <div key={option.id}>
          {
            option.type === 'logout'
              ? <Button 
                type='link' 
                icon={option.icon}
                onClick={signOut}
              >{option.title}</Button>
              : <Link to={option.id} onClick={closeAll}><Button 
                type="text" 
                icon={option.icon}
              >{option.title}</Button></Link>
          }
        </div>
      )}
    />
  )
})