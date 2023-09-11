import { Col, Row } from "antd/es/grid"
import { Header } from "antd/es/layout/layout"
import { HeaderSearchBar } from "./SearchBar"
import { BrightColorPalette } from "../../styles/palette"
import { searchComics } from "../../apis/comicsApi"
import { useEffect, useState } from "react"
import { Comic } from "../../types/Comic"
import './header.css'
import { AuthenOnlyGoogleField, UserField } from "./RightFields"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../stores"
import { MenuMain } from "./MenuMain/MenuMain"
import useScreenSize from "../../utils/screenWidth"
import { Button, Drawer, Image } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

const headerStyle = {
  backgroundColor: BrightColorPalette.Primary
}

export const HeaderMain : React.FC = observer(() => {
  const { authStore, comicStore } = useRootStore();
  const { isMobile } = useScreenSize()
  const { user, logout } = authStore
  const { genres, getGenres } = comicStore

  const [searchedComics, setSearchedComics] = useState<Comic[]>([])
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    getGenres()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchedComics([]);
      return;
    }

    const listSearchComics = await searchComics(query);
    setSearchedComics(listSearchComics.comics);
  };

  const onClickItemMenu = () => {
    setOpen(false)
  };

  return(
    <Header style={headerStyle}>
      <Row>
        <Col span={isMobile ? 12 : 2}>
          <Link to={'/'}>
            <Image className="logo" src='/truyen-chibi-ss.svg' alt="logo" height={64} preview={false}/>
          </Link>
        </Col>
        {
          !isMobile 
            ? <>
              <Col span={13}>
                <MenuMain genres={genres} onClickItemMenu={onClickItemMenu} />
              </Col>
              <Col span={5}>
                <HeaderSearchBar 
                  onSearch={onSearch}
                  searchedComics={searchedComics}
                />
              </Col>
              <Col span={4}>
                {
                  !user
                    ? <AuthenOnlyGoogleField />
                    : <UserField user={user} logout={logout}/>
                }
              </Col>
            </>
            : <>
              <Col span={8}></Col>
              <Col span={4} style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                flexDirection: 'column',
                height: '64px !important'
              }}>
                <Button 
                  icon={<EllipsisOutlined />} 
                  onClick={() => setOpen(true)}
                  ghost
                ></Button>
                <Drawer
                  title={
                    <Row justify={'space-between'} align={'middle'}>
                      <Col>
                        <Link to={'/'}>
                          <Image className="logo" src='/truyen-chibi-ss.svg' alt="logo" height={64} preview={false}/>
                        </Link>
                      </Col>
                      <Col>
                        {
                          !user
                            ? <AuthenOnlyGoogleField />
                            : <UserField user={user} logout={logout}/>
                        }
                      </Col>
                    </Row>
                  }
                  placement={'left'}
                  onClose={() => setOpen(false)}
                  open={open}
                  key={'left'}
                  style={{backgroundColor: BrightColorPalette.LightBackground}}
                >
                  <HeaderSearchBar 
                    onSearch={onSearch}
                    searchedComics={searchedComics}
                  />
                  <MenuMain genres={genres} onClickItemMenu={onClickItemMenu}/>
                </Drawer>
              </Col>
            </>
        }
      </Row>
    </Header>
  )
})