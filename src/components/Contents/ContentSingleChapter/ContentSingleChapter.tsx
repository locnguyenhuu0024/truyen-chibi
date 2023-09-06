import { Affix, Col, Divider, Image, MenuProps, Row, Skeleton, Space } from "antd";
import { Chapter, ChapterResponse } from "../../../types/Comic";
import { CustomizeText, CustomizeTitle } from "../../Customizes";
import { BrightColorPalette as Palette } from "../../../styles/palette";
import { Link } from "react-router-dom";
import { getSingleChapterPath } from "../../../utils/getRoute";
import './style.css'
import useScreenSize from "../../../utils/screenWidth";
import { NavigationChapter } from "./NavigationChapter";

type ContentSingleChapterProps = {
  comicId: string,
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

export const ContentSingleChapter : React.FC<ContentSingleChapterProps> = ({comicId, chapterId, singleChapter, loading}) => {
  const { isMobile } = useScreenSize()
  const {chapters, images, chapter_name, comic_name} = singleChapter
  const currentChapterIndex = chapters.findIndex((chapter) => chapter?.id.toString() === chapterId)
  
  const goToTheChapter = (func: 'next' | 'prev') => {
    let foundChapter : Chapter
    if(func === 'next' && currentChapterIndex !== -1){
      foundChapter = chapters[(currentChapterIndex - 1)]
      if(!foundChapter) return '#'
      return getSingleChapterPath(comicId, foundChapter.id)
    }else if(func === 'prev' && currentChapterIndex != 1){
      foundChapter = chapters[(currentChapterIndex + 1)]
      if(!foundChapter) return '#'
      return getSingleChapterPath(comicId, foundChapter.id)
    }
  }
  
  return (
    <div
      style={{
        width: '100%',
        overflow: 'auto',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <Row style={{padding: isMobile ? 0 : 16}}>
        <Col span={24}>
          <CustomizeTitle title={comic_name} style={{textAlign: 'center', color: Palette.Text}} />
          <Affix offsetTop={-30}>
            <NavigationChapter 
              chapterId={chapterId} 
              chapterItems={chapterItems} 
              chapterName={chapter_name}
              chapters={chapters}
              goToTheChapter={goToTheChapter}
              isMobile={isMobile}
              comicId={comicId}
            />
          </Affix>
          <Divider>
            <Space direction='vertical'>
              <div>{comic_name}</div>
              <CustomizeText value={`Chương ${chapter_name}`} style={{color: Palette.Accent}} />
            </Space>
          </Divider>
          <Row>
            <div style={{ width: '100%' }}>
              <Skeleton loading={loading} active>
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
              </Skeleton>
            </div>
          </Row>
          <NavigationChapter 
            chapterId={chapterId} 
            chapterItems={chapterItems} 
            chapterName={chapter_name}
            chapters={chapters}
            goToTheChapter={goToTheChapter}
            isMobile={isMobile}
            comicId={comicId}
          />
        </Col>
      </Row>
    </div>
  )
}