import { Avatar, Button, Col, Popover, Row, Space, Typography } from "antd"
import { UserOptionList } from "./UserOptionList"
import { User } from "../../../../types/User"
import { observer } from "mobx-react-lite"

type UserFieldProps = {
  user: User | null,
  logout: () => void,
}

export const UserField : React.FC<UserFieldProps> = observer(({user, logout}) => {
  return (
    <Row justify={'end'} align={'middle'} style={{width: '100%', height: '100%'}}>
      <Col>
        <Popover
          content={
            <UserOptionList signOut={logout}/>
          }
          trigger="hover"
          placement="bottom"
          className="popover-list-search-comics"
        >
          <Button 
            className="button user"
            type="default" 
            onClick={() => {}}
            ghost
          >
            <Space size={'middle'}>
              <Avatar src={user?.photoURL}>{!user?.photoURL ? user?.email?.charAt(0).toUpperCase() : <></>}</Avatar>
              <Typography.Text strong>{user?.displayName || user?.email?.split("@")[0]}</Typography.Text>
            </Space>
          </Button>
        </Popover>
      </Col>
    </Row>
  )
})