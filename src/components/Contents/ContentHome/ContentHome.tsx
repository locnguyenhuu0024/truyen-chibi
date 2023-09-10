import { CarouselBanner } from "./CarouselBanner";
import { observer } from "mobx-react-lite";
import { Divider } from "antd";
import { ComicsListMain } from "./ComicsList";
import { useEffect } from "react";
import { useRootStore } from "../../../stores";


export const ContentHome : React.FC = observer(() => {
  const {comicStore} = useRootStore()
  const {
    recentUpdatedComics, 
    trendingComics,
    getTrendComics,
    getRecentUpdatedComics
  } = comicStore;

  useEffect(() => {
    recentUpdatedComics.comics.length <= 0 && getRecentUpdatedComics(1)
    // getRecommendComics();
    trendingComics.comics.length <= 0 && getTrendComics(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Divider><strong>TRUYỆN NỔI BẬT</strong></Divider>
      <CarouselBanner comicsResponse={trendingComics} />
      <Divider><strong>TRUYỆN VỪA CẬP NHẬT</strong></Divider>
      <ComicsListMain comicResponse={recentUpdatedComics} />
    </div>
  )
})