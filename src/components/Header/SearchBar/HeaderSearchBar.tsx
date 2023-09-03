import Search from "antd/es/input/Search"
import { Col, Popover, Row } from "antd"
import { Comic } from "../../../types/Comic"
import { ListSearchedComic } from "./ListSearchedComics"
import { useState } from "react"
import debounce from 'lodash.debounce';
import { observer } from "mobx-react-lite"

type HeaderSearchBarProps = {
  onSearch: (query: string) => void,
  searchedComics: Comic[]
}

const searchBarStyle = { 
  width: 300,
  padding: '8px 16px',
  fontSize: 16
}

export const HeaderSearchBar : React.FC<HeaderSearchBarProps> = observer(({onSearch, searchedComics}) => {
  // const [showListSearched, setShowListSearched] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('')

  const handleSearchingComics = () => {
    debouncedSearch(query)
  }
  
  // const handleClickToShowList = () => {
  //   setShowListSearched(true);
  // };

  // const handleCloseSearchingList = () => setShowListSearched(false);

  const debouncedSearch = debounce(onSearch, 100); 

  return (
    <Row style={{width: '100%', height: '100%'}} justify={'center'} align={'middle'}>
      <Col>
        <Popover
          content={
            <ListSearchedComic listSearchedComic={searchedComics} />
          }
          // open={showListSearched}
          trigger="hover"
          placement="bottom"
          className="popover-list-search-comics"
        >
          <Row justify={'center'} align={'middle'}>
            <Search 
              placeholder="Nhập tên truyện..." 
              onSearch={onSearch}
              style={searchBarStyle} 
              onChange={(e) => setQuery(e.target.value)}
              // onBlur={handleCloseSearchingList}
              // onClick={handleClickToShowList}
              onKeyUp={handleSearchingComics}
            />
          </Row>
        </Popover>
      </Col>
    </Row>
  )
})