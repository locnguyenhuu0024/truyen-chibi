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
import { TrendingComicsPage } from "./TrendingComicsPage";
import { ComicsByGenrePage } from "./ComicsByGenrePage";
import { NewComicsPage } from "./NewComicsPage";
import { BoyComicsPage } from "./BoyComicsPage";
import { GirlComicsPage } from "./GirlComicsPage";

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: Palette.Background
};

export const IndexPage : React.FC = observer(() => {
  const { isLargeScreen } = useScreenSize()
  return (
    <Layout hasSider>
      {
        isLargeScreen && <Sider style={siderStyle}></Sider>
      }
      <Routes>
        <Route path={RouteComics.Home} Component={HomePage} />
        <Route path={RouteComics.ComicDetail} Component={ComicDetailPage} />
        <Route path={RouteComics.SingleChapter} Component={SingleChapterPage} />
        <Route path={RouteComics.Trending} Component={TrendingComicsPage} />
        <Route path={RouteComics.ComicsByGenre} Component={ComicsByGenrePage} />
        <Route path={RouteComics.NewComics} Component={NewComicsPage} />
        <Route path={RouteComics.GirlComics} Component={GirlComicsPage} />
        <Route path={RouteComics.BoyComics} Component={BoyComicsPage} />
      </Routes>
      {
        isLargeScreen && <Sider style={siderStyle}></Sider>
      }
    </Layout>
  )
})