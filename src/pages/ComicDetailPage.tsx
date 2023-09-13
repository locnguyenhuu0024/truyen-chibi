import { observer } from "mobx-react-lite";
import { ContentComicDetail } from "../components/Contents";
import { Content } from "antd/es/layout/layout";
import { BrightColorPalette as Palette } from "../styles/palette";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRootStore } from "../stores";
import { Helmet } from "react-helmet";

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
  const { description, title, thumbnail } = comicDetail

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if(!comicId) return;
    getComicDetail(comicId)
    setTimeout(() => {setLoading(false)}, 2000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicId])
  
  return (
    <>
      <Helmet>
        <title>{title} | Truyện Chibi 🌟</title>
        <meta
          name="description"
          content={description}
        />
        <meta property="og:image" content={thumbnail} />
      </Helmet>
      <Content style={contentStyle}>
        <ContentComicDetail loading={loading} comicDetail={comicDetail} />
      </Content>
    </>
  )
})