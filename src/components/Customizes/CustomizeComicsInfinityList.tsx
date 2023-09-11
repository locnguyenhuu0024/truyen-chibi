import { Button, Card, ConfigProvider, Image, List, Row } from "antd"
import { Comic, ComicsResponse } from "../../types/Comic"
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingOutlined } from "@ant-design/icons";
import { CustomizeParagraph, CustomizeText, CustomizeTitle } from ".";
import { BrightColorPalette as Palette } from "../../styles/palette";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { getComicDetail } from "../../utils/getRoute";
import useScreenSize from "../../utils/screenWidth";
import { emptyImage } from "../../types/Route";

type CustomizeComicsInfinityListProps = {
  comicResponse?: ComicsResponse,
  comics?: Comic[],
  getComicList?: (page?: number, status?: string) => Promise<void>
  loading?: boolean,
  needToLoad?: boolean
}

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <LoadingOutlined style={{ fontSize: 48, color: 'white' }} spin />
    <p>Đang tải truyện</p>
  </div>
);

const { Meta } = Card
export const CustomizeComicsInfinityList : React.FC<CustomizeComicsInfinityListProps> = observer(({
  comicResponse, 
  getComicList, 
  loading,
  needToLoad
}) => {
  const { isMobile } = useScreenSize()
  const [currentComicList, setCurrentComicList] = useState<Comic[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const loadMoreComicList = async () => {
    if (loading) {
      return;
    }
    await getComicList!(currentPage + 1)
  };

  useEffect(() => {
    if(comicResponse?.comics[0]?.id === currentComicList[0]?.id) return

    setCurrentComicList(prev => [...prev, ...comicResponse!.comics])
    setCurrentPage(comicResponse!.current_page)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicResponse])

  return (
    <div>
      <InfiniteScroll
        dataLength={currentComicList.length}
        next={needToLoad ? loadMoreComicList : () => {}}
        hasMore={ currentComicList.length <= 200 }
        loader={undefined}
        endMessage={
          <Button 
            loading={loading} 
            onClick={loadMoreComicList} 
            type='primary' 
            ghost
            disabled={!needToLoad}
          >
            {
              loading ? 'Đang tải....' : 'Tải thêm truyện'
            }
          </Button>
        }
      >
        <ConfigProvider renderEmpty={currentComicList.length <= 0 ? customizeRenderEmpty : undefined}>
          <List
            grid={isMobile ? { gutter: 0, column: 2 } : { gutter: 8, column: 5 }}
            dataSource={currentComicList}
            renderItem={(comic) => (
              <List.Item key={comic.id + comic.title}>
                <Link 
                  to={`${getComicDetail(comic.id)}`}
                  style={{
                    display: "flex", 
                    justifyContent: 'center', 
                    alignItems: 'center'
                  }}
                >
                  <Card
                    hoverable
                    style={isMobile ? { width: 180, height: 320} : { width: 200, height: 400 }}
                    cover={<Image height={220} alt={comic.id} src={comic.thumbnail} fallback={emptyImage} />}
                  >
                    <Meta 
                      title={<CustomizeTitle title={comic.title} style={{fontSize: isMobile ? 14 : 16}} />} 
                      description={!isMobile && <CustomizeParagraph value={comic.short_description} limitRow={2} />}
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
        </ConfigProvider>
      </InfiniteScroll>
    </div>
  );
})