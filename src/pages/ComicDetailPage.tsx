import { observer } from "mobx-react-lite";
import { ContentComicDetail } from "../components/Contents";
import { Content } from "antd/es/layout/layout";
import { BrightColorPalette as Palette } from "../styles/palette";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRootStore } from "../stores";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: Palette.Background
};

export const ComicDetailPage : React.FC = observer(() => {
  const { comicId } = useParams();
  const { comicStore } = useRootStore();
  const { comicDetail, getComicDetail } = comicStore

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if(!comicId) return;
    setLoading(true)
    getComicDetail(comicId)
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicId])

  return (
    <Content style={contentStyle}>
      <ContentComicDetail loading={loading} comicDetail={comicDetail} />
    </Content>
  )
})