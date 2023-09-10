import { Avatar, Button, Col, Popover, Row, Space, Typography } from "antd"
import { UserOptionList } from "./UserOptionList"
import { User } from "../../../../types/User"
import { observer } from "mobx-react-lite"
import { BrightColorPalette } from "../../../../styles/palette"
import useScreenSize from "../../../../utils/screenWidth"

type UserFieldProps = {
  user: User | null,
  logout: () => void,
}

export const UserField : React.FC<UserFieldProps> = observer(({user, logout}) => {
  const { isMobile } = useScreenSize()
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
            style={{borderColor: isMobile ? BrightColorPalette.Accent : 'white'}}
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