import Search from "antd/es/input/Search"
import { Col, Popover, Row } from "antd"
import { Comic } from "../../../types/Comic"
import { ListSearchedComic } from "./ListSearchedComics"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"

type HeaderSearchBarProps = {
  onSearch: (query: string) => void,
  searchedComics: Comic[],
  onClickItemMenu?: () => void,
}

const searchBarStyle = { 
  width: 300,
  padding: '8px 16px',
  fontSize: 16
}

export const HeaderSearchBar : React.FC<HeaderSearchBarProps> = observer(({
  onSearch, 
  searchedComics,
  onClickItemMenu,
}) => {
  const [query, setQuery] = useState<string>('')
  // Sử dụng state để lưu trạng thái của setTimeout
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>()
  const [currentSearchList, setCurrentSearchList] = useState<Comic[]>([])
  const opened = currentSearchList?.length > 0

  useEffect(() => {
    if(!query || searchedComics?.length === 0){
      setCurrentSearchList([])
      return
    }
    setCurrentSearchList(searchedComics)
  }, [searchedComics, query])

  // Hàm này được gọi khi người dùng thay đổi giá trị trong input
  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    
    // Hủy bỏ bất kỳ timeout cũ nào để tránh tìm kiếm không cần thiết
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Đặt timeout mới, sau 300ms, tìm kiếm sẽ được thực hiện
    const newTimeout = setTimeout(() => {
      onSearch(newQuery);
    }, 200);

    // Lưu trạng thái timeout mới vào state
    setSearchTimeout(newTimeout);
    
    // Cập nhật giá trị tìm kiếm
    setQuery(newQuery);
  }

  const handleClosePopup = () => {
    onClickItemMenu!()
    setCurrentSearchList([])
  }

  return (
    <Row style={{width: '100%'}} justify={'center'} align={'middle'}>
      <Col>
        <Popover
          content={
            <ListSearchedComic listSearchedComic={searchedComics} onClickItemMenu={handleClosePopup}/>
          }
          open={opened}
          trigger="hover"
          placement="bottom"
          className="popover-list-search-comics"
        >
          <Row justify={'center'} align={'middle'}>
            <Search 
              placeholder="Nhập tên truyện..." 
              onSearch={onSearch}
              style={searchBarStyle} 
              value={query}
              onChange={(e) => handleInputChange(e)}
            />
          </Row>
        </Popover>
      </Col>
    </Row>
  )
})