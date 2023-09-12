import { observer } from "mobx-react-lite";
import { Content } from "antd/es/layout/layout";
import { BrightColorPalette as Palette } from "../styles/palette";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRootStore } from "../stores";
import { ContentSingleChapter } from "../components/Contents";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: Palette.Background
};

export const SingleChapterPage : React.FC = observer(() => {
  const { comicId, chapterId } = useParams();
  const { comicStore } = useRootStore();
  const { singleChapter, getSingleChapter } = comicStore

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if(!comicId || !chapterId) return;
    setLoading(true)
    getSingleChapter(comicId, chapterId!)
    setTimeout(() => {setLoading(false)}, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicId, chapterId])

  return (
    <Content style={contentStyle}>
      <ContentSingleChapter singleChapter={singleChapter} loading={loading} comicId={comicId!} chapterId={`${chapterId}`} />
    </Content>
  )
})