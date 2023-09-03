import { Button, Col, Divider, Dropdown, Image, MenuProps, Row, Space } from "antd";
import { Chapter, ChapterResponse } from "../../../types/Comic";
import { CustomizeText } from "../../Customizes";
import { BrightColorPalette as Palette } from "../../../styles/palette";
import { Link } from "react-router-dom";
import { getSingleChapterPath } from "../../../utils/getRoute";
import { ArrowLeftOutlined, ArrowRightOutlined, UnorderedListOutlined } from "@ant-design/icons";
import './style.css'

type ContentSingleChapterProps = {
  commicId: string,
  chapterId: string,
  singleChapter: ChapterResponse,
  loading?: boolean
}

const chapterItems = (comicId: string, chapters: Chapter[]): MenuProps['items'] => (
  chapters.map(chapter => ({
    key: chapter.id, 
    label: <Link to={getSingleChapterPath(comicId, chapter.id)}>{chapter.name}</Link>
  }))
)

export const ContentSingleChapter : React.FC<ContentSingleChapterProps> = ({commicId, chapterId, singleChapter}) => {
  const {chapters, images, chapter_name, comic_name} = singleChapter
  const currentChapterIndex = chapters.findIndex((chapter) => chapter?.id.toString() === chapterId)
  
  const goToTheChapter = (func: 'next' | 'prev') => {
    let foundChapter : Chapter
    if(func === 'next' && currentChapterIndex !== -1){
      foundChapter = chapters[(currentChapterIndex - 1)]
      if(!foundChapter) return '#'
      return getSingleChapterPath(commicId, foundChapter.id)
    }else if(func === 'prev' && currentChapterIndex != 1){
      foundChapter = chapters[(currentChapterIndex + 1)]
      if(!foundChapter) return '#'
      return getSingleChapterPath(commicId, foundChapter.id)
    }
  }
  
  return (
    <div
      style={{
        width: '100%',
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <Row style={{padding: 16}}>
        <Col span={24}>
          <Row justify={'center'} align={'middle'}>
            <Col span={9} style={{display: 'flex', justifyContent: 'end', paddingRight: 16}}>
              <Link to={goToTheChapter('prev') || '#'}>
                <Button icon={<ArrowLeftOutlined />} shape='circle' disabled={currentChapterIndex === chapters.length - 1}></Button>
              </Link>
            </Col>
            <Col span={6}>
              <Dropdown 
                menu={{items: chapterItems(commicId, chapters)}} 
                trigger={['click']}
              >
                <Button style={{width: '100%'}} icon={<UnorderedListOutlined />}>{chapter_name}</Button>
              </Dropdown>
            </Col>
            <Col span={9} style={{display: 'flex', justifyContent: 'start', paddingLeft: 16}}>
              <Link to={goToTheChapter('next') || '#'}>
                <Button icon={<ArrowRightOutlined />} shape='circle' disabled={currentChapterIndex === 0}></Button>
              </Link>
            </Col>
          </Row>
          <Divider>
            <Space direction='vertical'>
              <div>{comic_name}</div>
              <CustomizeText value={`Chương ${chapter_name}`} style={{color: Palette.Accent}} />
            </Space>
          </Divider>
          <Row>
            <div style={{ width: '100%' }}>
              {
                images.map((image) => (
                  <Image 
                    key={image.page} 
                    alt={image.src} 
                    src={image.src} 
                    width={'100%'} 
                    height={'auto'} 
                    preview={false} 
                  />
                ))
              }
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  )
}