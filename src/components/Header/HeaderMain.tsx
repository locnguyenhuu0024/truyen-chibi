import { Col, Row } from "antd/es/grid"
import { Header } from "antd/es/layout/layout"
import { HeaderSearchBar } from "./SearchBar"
import { BrightColorPalette } from "../../styles/palette"
import { searchComics } from "../../apis/comicsApi"
import { useEffect, useState } from "react"
import { Comic } from "../../types/Comic"
import './header.css'
import { AuthenField, UserField } from "./RightFields"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../stores"
import { MenuMain } from "./MenuMain/MenuMain"

const headerStyle = {
  backgroundColor: BrightColorPalette.Primary
}

export const HeaderMain : React.FC = observer(() => {
  const { authStore, comicStore } = useRootStore();
  const { user, logout } = authStore
  const { genres, getGenres } = comicStore

  const [searchedComics, setSearchedComics] = useState<Comic[]>([]);

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

  return(
    <Header style={headerStyle}>
      <Row>
        <Col span={2}>
          <strong>Truyện Chibi</strong>
        </Col>
        <Col span={13}>
          <MenuMain genres={genres} />
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
              ? <AuthenField />
              : <UserField user={user} logout={logout}/>
          }
        </Col>
      </Row>
    </Header>
  )
})