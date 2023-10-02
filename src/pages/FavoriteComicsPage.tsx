import { useEffect } from "react"
import { useRootStore } from "../stores"
import { Card, Divider, Image, List, Space } from "antd"
import Meta from "antd/es/card/Meta"
import { CustomizeTitle, CustomizeParagraph } from "../components/Customizes"
import { emptyImage } from "../types/Route"
import { Link } from "react-router-dom"
import { getComicDetail } from "../utils/getRoute"
import useScreenSize from "../utils/screenWidth"
import { BrightColorPalette } from "../styles/palette"
import { observer } from "mobx-react-lite"

export const FavoriteComicsPage : React.FC = observer(() => {
  const { isMobile, isTablet } = useScreenSize()
  const {authStore, comicStore} = useRootStore()
  const {user} = authStore
  const {favoriteComics, getFavoriteComics} = comicStore
  const responsiveGrid = isMobile ? { gutter: 0, column: 2 } : isTablet ? { gutter: 8, column: 3 } : { gutter: 8, column: 5 }

  useEffect(() => {
    if(user?.uid)
      getFavoriteComics(user?.uid)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid])

  return (
    <>
      <Space direction="vertical" style={{width: '100%', backgroundColor: BrightColorPalette.Background}}>
        <Divider><CustomizeTitle title="Truyện yêu thích" /></Divider>
        <List
          grid={responsiveGrid}
          dataSource={favoriteComics}
          renderItem={(comic) => (
            <List.Item key={comic.comicId + comic.comicName}>
              <Link 
                to={`${getComicDetail(comic.comicId)}`}
                style={{
                  display: "flex", 
                  justifyContent: 'center', 
                  alignItems: 'center',
                }}
              >
                <Card
                  hoverable
                  style={isMobile ? { width: 180, height: 300} : { width: 200, height: 400 }}
                  cover={<Image 
                    height={220} 
                    alt={comic.comicId} 
                    src={comic.comicThumbnail} 
                    fallback={emptyImage}
                  />}
                >
                  <Meta 
                    title={<CustomizeTitle title={comic.comicName} style={{fontSize: isMobile ? 14 : 16}} />} 
                    description={!isMobile && <CustomizeParagraph value={comic.comicDescription} limitRow={2} />}
                  />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </Space>
    </>
  )
})