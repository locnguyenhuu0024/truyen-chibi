import { Button, Col, Divider, List, Row, Skeleton, Space } from "antd"
import { Link } from "react-router-dom"
import { CustomizeText } from "../../Customizes"
import { Chapter } from "../../../types/Comic"
import { BrightColorPalette as Palette } from "../../../styles/palette";
import { getSingleChapterPath } from "../../../utils/getRoute";

type ComicChapterListProps = {
  comicId: string,
  chapters: Chapter[],
  loading?: boolean
}

export const ComicChapterList : React.FC<ComicChapterListProps> = ({comicId, chapters, loading}) => {
  return (
    <>
      <Space size={'small'} direction='horizontal'>
        <Link to={getSingleChapterPath(comicId, chapters[chapters?.length-1]?.id)}>
          <Button danger ghost>Đọc từ đầu</Button>
        </Link>
        <Link to={getSingleChapterPath(comicId, chapters[0]?.id)}>
          <Button type='primary' danger>Chương mới nhất</Button>
        </Link>
      </Space>
      <Divider>
        <Space direction='vertical'>
          <div>Danh sách chương</div>
          <CustomizeText value={`${chapters.length} chương`} style={{color: Palette.Accent}} />
        </Space>
      </Divider>
      <Skeleton loading={loading} active title>
        <Row>
          <div
            style={{
              width: '100%',
              height: 400,
              overflow: 'auto',
              padding: '0 16px',
            }}
          >
            <List 
              dataSource={chapters} 
              renderItem={(chapter) => (
                <Link className="link" key={chapter.id} to={getSingleChapterPath(comicId, chapter.id)}>
                  <List.Item>
                    <Row justify={'space-between'} style={{width: '100%'}}>
                      <Col span={12}>
                        <Button style={{width: '100%', textAlign: 'start'}} type={'link'}>{chapter.name}</Button>
                      </Col>
                      <Col span={12}>
                        <CustomizeText value='Xem ngay >' style={{color: Palette.SecondaryText, textAlign: 'end'}} />
                      </Col>
                    </Row>
                  </List.Item>
                </Link>
              )}
            />
          </div>
        </Row>
      </Skeleton>
    </>
  )
}