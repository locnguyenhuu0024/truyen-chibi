import { observer } from "mobx-react-lite"
import { useRootStore } from "../stores"
import { Content } from "antd/es/layout/layout"
import { BrightColorPalette as Palette } from "../styles/palette";
import { useEffect, useState } from "react";
import { ContentNewComics } from "../components/Contents";
import { Divider } from "antd";
import { CustomizeTitle } from "../components/Customizes";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: Palette.Background
};

export const NewComicsPage : React.FC = observer(() => {
  const {comicStore} = useRootStore()
  const { newComics, getNewComics } = comicStore
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getNewComics(1)
    setTimeout(() => {setLoading(false)}, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Content style={contentStyle}>
      <Divider><CustomizeTitle title="Truyện mới" /></Divider>
      <ContentNewComics comics={newComics} getNewComic={getNewComics} loading={loading} />
    </Content>
  )
})