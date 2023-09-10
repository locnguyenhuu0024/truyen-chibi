import { observer } from "mobx-react-lite"
import { useRootStore } from "../stores"
import { Content } from "antd/es/layout/layout"
import { BrightColorPalette as Palette } from "../styles/palette";
import { ContentTrendingComics } from "../components/Contents";
import { useEffect, useState } from "react";

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
    setTimeout(() => {setLoading(false)}, 3000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Content style={contentStyle}>
      <ContentTrendingComics comicResponse={trendingComics} getTrendingComics={getTrendComics} loading={loading} />
    </Content>
  )
})