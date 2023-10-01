import Search from "antd/es/input/Search"
import { Button, Popover } from "antd"
import { Comic } from "../../../types/Comic"
import { ListSearchedComic } from "./ListSearchedComics"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { SearchOutlined } from "@ant-design/icons"

type SearchBarPopupProps = {
  onSearch: (query: string) => void,
  searchedComics: Comic[],
  onClickItemMenu?: () => void,
}

const searchBarStyle = { 
  width: '100%',
  fontSize: 16
}

export const SearchBarPopup : React.FC<SearchBarPopupProps> = observer(({
  onSearch, 
  searchedComics,
  onClickItemMenu,
}) => {
  const [query, setQuery] = useState<string>('')
  // Sử dụng state để lưu trạng thái của setTimeout
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>()
  const [currentSearchList, setCurrentSearchList] = useState<Comic[]>([])

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
    <>
      <Popover
        style={{width: '100%'}}
        content={
          <>
            <Search 
              placeholder="Nhập tên truyện..." 
              onSearch={onSearch}
              style={searchBarStyle} 
              value={query}
              onChange={(e) => handleInputChange(e)}
            />
            <ListSearchedComic listSearchedComic={currentSearchList} onClickItemMenu={handleClosePopup}/>
          </>
        }
        trigger="click"
        placement="bottom"
        className="popover-list-search-comics"
      >
        <Button icon={<SearchOutlined />} shape="circle" ghost/>
      </Popover>
    </>
  )
})