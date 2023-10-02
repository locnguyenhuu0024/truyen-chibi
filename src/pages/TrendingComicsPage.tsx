import { observer } from "mobx-react-lite"
import { useRootStore } from "../stores"
import { Content } from "antd/es/layout/layout"
import { BrightColorPalette as Palette } from "../styles/palette";
import { ContentTrendingComics } from "../components/Contents";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: Palette.Background
};

export const TrendingComicsPage : React.FC = observer(() => {
  const {comicStore} = useRootStore()
  const { trendingComics, getTrendComics } = comicStore
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getTrendComics(1)
    setTimeout(() => {setLoading(false)}, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Helmet>
        <title>Truyện tranh xu hướng | Truyện Chibi 🌟</title>
        <meta
          name="description"
          content="Truyện Chibi là nơi bạn sẽ khám phá thế giới truyện tranh dễ thương độc đáo, cùng những câu chuyện tuyệt vời. Với bộ sưu tập đa dạng và chất lượng, chúng tôi mang đến cho bạn những giây phút giải trí thú vị. Khám phá ngay và cùng chia sẻ niềm đam mê truyện tranh tại Truyện Chibi! 📚✨"
        />
        <meta property="og:image" content={'/truyen-chibi.png'} />
      </Helmet>
      <Content style={contentStyle}>
        <ContentTrendingComics comicResponse={trendingComics} getTrendingComics={getTrendComics} loading={loading} />
      </Content>
    </>
  )
})