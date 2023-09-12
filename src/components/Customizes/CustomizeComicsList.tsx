import { Card, ConfigProvider, Image, List, Row } from "antd"
import { BrightColorPalette as Palette } from "../../styles/palette";
import { Link } from "react-router-dom"
import { CustomizeParagraph, CustomizeText, CustomizeTitle } from "./"
import Meta from "antd/es/card/Meta";
import { getComicDetail } from "../../utils/getRoute";
import { Comic } from "../../types/Comic";
import { LoadingOutlined } from "@ant-design/icons";
import { emptyImage } from "../../types/Route";

type CustomizeComicsListProps = {
  comics: Comic[],
  isMobile: boolean,
  loading: boolean
}

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <LoadingOutlined style={{ fontSize: 48, color: 'white' }} spin />
    <p>Đang tải truyện</p>
  </div>
);

export const CustomizeComicsList : React.FC<CustomizeComicsListProps> = ({comics, isMobile, loading}) => {
  return (
    <ConfigProvider renderEmpty={comics.length <= 0 ? customizeRenderEmpty : undefined}>
      <List
        grid={isMobile ? { gutter: 0, column: 2 } : { gutter: 8, column: 5 }}
        dataSource={comics}
        loading={loading}
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
                cover={<Image height={220} alt={comic.id} src={comic.thumbnail} fallback={emptyImage} preview={false} />}
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
  )
}