import { observer } from "mobx-react-lite"
import { useRootStore } from "../stores"
import { Content } from "antd/es/layout/layout"
import { BrightColorPalette as Palette } from "../styles/palette";
import { useEffect, useState } from "react";
import { Divider } from "antd";
import { CustomizeTitle } from "../components/Customizes";
import { ContentGirlComics } from "../components/Contents";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: Palette.Background
};

export const GirlComicsPage : React.FC = observer(() => {
  const {comicStore} = useRootStore()
  const { girlComics, getGirlComics } = comicStore
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getGirlComics(1)
    setTimeout(() => {setLoading(false)}, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Content style={contentStyle}>
      <Divider><CustomizeTitle title="Girl's Comics" /></Divider>
      <ContentGirlComics comicsResponse={girlComics} loading={loading} getComics={getGirlComics} />
    </Content>
  )
})