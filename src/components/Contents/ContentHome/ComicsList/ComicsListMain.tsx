import { Button, Card, List, Row } from "antd"
import { Comic, ComicsResponse } from "../../../../types/Comic"
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingOutlined } from "@ant-design/icons";
import { CustomizeParagraph, CustomizeText } from "../../../Customizes";
import { BrightColorPalette as Palette } from "../../../../styles/palette";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useRootStore } from "../../../../stores";
import { getComicDetail } from "../../../../utils/getRoute";

type ComicsListMainProps = {
  comicResponse: ComicsResponse,
}

const { Meta } = Card
export const ComicsListMain : React.FC<ComicsListMainProps> = observer(({comicResponse}) => {
  const {comicStore} = useRootStore()
  const {getRecentUpdatedComics} = comicStore;

  const [loading, setLoading] = useState<boolean>(false);
  const [currentComicList, setCurrentComicList] = useState<Comic[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const loadMoreComicList = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    await getRecentUpdatedComics(currentPage + 1)
    setLoading(false)
  };

  useEffect(() => {
    setCurrentComicList(prev => [...prev, ...comicResponse.comics])
    setCurrentPage(comicResponse.current_page)
  }, [comicResponse])

  return (
    <div>
      <InfiniteScroll
        dataLength={currentComicList.length}
        next={loadMoreComicList}
        hasMore={ currentComicList.length <= 200 }
        loader={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        endMessage={
          <Button 
            loading={loading} 
            onClick={loadMoreComicList} 
            type='primary' 
            ghost
          >
            {
              loading ? 'Đang tải....' : 'Tải thêm truyện'
            }
          </Button>
        }
      >
        <List
          grid={{ gutter: 8, column: 5 }}
          dataSource={currentComicList}
          renderItem={(comic) => (
            <List.Item key={comic.id + comic.title}>
              <Link to={`${getComicDetail(comic.id)}`}>
                <Card
                  hoverable
                  style={{ width: 200, height: 400 }}
                  cover={<img height={220} alt={comic.id} src={comic.thumbnail} />}
                >
                  <Meta 
                    title={comic.title} 
                    description={<CustomizeParagraph value={comic.short_description} limitRow={3} />}
                  />
                  <Row justify={'space-between'}>
                    <CustomizeText style={{color: Palette.Accent}} value={comic.last_chapter.name}/>
                    <CustomizeText style={{color: Palette.SecondaryText, fontSize: 12}} value={comic.updated_at}/>
                  </Row>
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
})