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

const initialComic = {
  title: "",
  thumbnail: "",
  description: "",
  authors: "",
  status: "",
  genres: [],
  total_views: 0,
  followers: 0,
  chapters: [],
  id: "",
  other_names: []
}

export const ComicDetailPage : React.FC = observer(() => {
  const { comicId } = useParams();
  const { comicStore, authStore } = useRootStore();
  const { user } = authStore
  const { comicDetail, setComicDetail, getComicDetail, getFavoriteComics } = comicStore
  const { description, title, thumbnail } = comicDetail

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    loadComicDetail(comicId!)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicId])


  const loadComicDetail = async (comicId: string) => {
    if(comicDetail.id !== comicId) setComicDetail(initialComic)
    if(!comicId) return;
    await getComicDetail(comicId)
    if(user?.uid){
      await getFavoriteComics(user.uid)
    }
  }
  
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