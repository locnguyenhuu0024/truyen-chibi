import { CarouselBanner } from "./CarouselBanner";
import { observer } from "mobx-react-lite";
import { Divider } from "antd";
import { ComicsListMain } from "./ComicsList";
import { useEffect, useState } from "react";
import { useRootStore } from "../../../stores";
import { TrendingComicsList } from "./TrendingComicsList";


export const ContentHome : React.FC = observer(() => {
  const {comicStore} = useRootStore()
  const {
    recentUpdatedComics, 
    trendingComics,
    getTrendComics,
    getRecentUpdatedComics
  } = comicStore;
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    recentUpdatedComics.comics.length <= 0 && getRecentUpdatedComics(1)
    // getRecommendComics();
    trendingComics.comics.length <= 0 && getTrendComics(1);

    setTimeout(() => {setLoading(false)}, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Divider><strong>TRUYỆN NỔI BẬT</strong></Divider>
      <CarouselBanner comicsResponse={trendingComics} />
      <TrendingComicsList trendingComics={trendingComics.comics} loading={loading} />
      <Divider><strong>TRUYỆN VỪA CẬP NHẬT</strong></Divider>
      <ComicsListMain comicResponse={recentUpdatedComics} />
    </div>
  )
})