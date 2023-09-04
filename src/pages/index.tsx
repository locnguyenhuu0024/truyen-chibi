import { Layout } from "antd"
import Sider from "antd/es/layout/Sider"
import { observer } from "mobx-react-lite";
import { BrightColorPalette as Palette } from "../styles/palette";
import { HomePage } from "./HomePage";
import {
  Routes, Route
} from "react-router-dom";
import { ComicDetailPage } from "./ComicDetailPage";
import { RouteComicEnums as RouteComics } from "../types/Route";
import { SingleChapterPage } from "./SingleChapterPage";
import useScreenSize from "../utils/screenWidth";

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: Palette.Background
};

export const IndexPage : React.FC = observer(() => {
  const { isMobile } = useScreenSize()
  return (
    <Layout hasSider>
      {
        !isMobile ? <Sider style={siderStyle}></Sider> : <></>
      }
      <Routes>
        <Route path={RouteComics.Home} Component={HomePage} />
        <Route path={RouteComics.ComicDetail} Component={ComicDetailPage} />
        <Route path={RouteComics.SingleChapter} Component={SingleChapterPage} />
      </Routes>
      {
        !isMobile ? <Sider style={siderStyle}></Sider> : <></>
      }
    </Layout>
  )
})