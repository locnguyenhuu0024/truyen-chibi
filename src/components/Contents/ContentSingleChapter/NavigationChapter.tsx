import { ArrowLeftOutlined, ArrowRightOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Button, Col, Dropdown, MenuProps, Row } from "antd"
import { Link } from "react-router-dom"
import { CustomizeText } from "../../Customizes"
import { BrightColorPalette as Palette } from "../../../styles/palette";
import { Chapter } from "../../../types/Comic"

type NavigationChapterProps = {
  chapters: Chapter[],
  chapterId: string,
  comicId: string,
  isMobile: boolean,
  chapterName: string,
  goToTheChapter: (func: 'next' | 'prev') => string | undefined,
  chapterItems: (comicId: string, chapters: Chapter[]) => MenuProps['items']
}

export const NavigationChapter : React.FC<NavigationChapterProps> = ({
  chapters, 
  chapterId, 
  comicId, 
  isMobile, 
  chapterName,
  goToTheChapter, 
  chapterItems
}) => {
  const currentChapterIndex = chapters.findIndex((chapter) => chapter?.id.toString() === chapterId)

  return (
    <Row justify={'center'} align={'middle'}>
      <Col span={isMobile ? 6 : 9} style={{height: 36, display: 'flex', justifyContent: 'end', paddingRight: 16}}>
        <Link to={goToTheChapter('prev') || '#'}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            shape='circle' 
            disabled={currentChapterIndex === chapters.length - 1}
          ></Button>
        </Link>
      </Col>
      <Col span={isMobile ? 12 : 6} style={{height: 36}}>
        <Dropdown 
          menu={{items: chapterItems(comicId, chapters)}} 
          trigger={['click']}
        >
          <Button 
            style={{width: '100%'}} 
            icon={<UnorderedListOutlined />}
          ><CustomizeText value={chapterName} style={{color: Palette.SecondaryText}}/></Button>
        </Dropdown>
      </Col>
      <Col span={isMobile ? 6 : 9} style={{height: 36, display: 'flex', justifyContent: 'start', paddingLeft: 16}}>
        <Link to={goToTheChapter('next') || '#'}>
          <Button 
            icon={<ArrowRightOutlined />} 
            shape='circle' 
            disabled={currentChapterIndex === 0}
          ></Button>
        </Link>
      </Col>
    </Row>
  )
}