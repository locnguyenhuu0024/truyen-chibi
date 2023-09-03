import { CarouselBanner } from "./CarouselBanner";
import { observer } from "mobx-react-lite";
import { Divider } from "antd";
import { ComicsListMain } from "./ComicsList";
import { useEffect } from "react";
import { useRootStore } from "../../../stores";



export const ContentHome : React.FC = observer(() => {
  const {comicStore} = useRootStore()
  const {
    // recommendComics, 
    recentUpdatedComics, 
    newComics,
    // getRecommendComics,
    getNewComics,
    getRecentUpdatedComics
  } = comicStore;

  useEffect(() => {
    recentUpdatedComics.comics.length <= 0 && getRecentUpdatedComics(1)
    // getRecommendComics();
    newComics.length <= 0 && getNewComics(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Divider>Truyện mới ra</Divider>
      <CarouselBanner comics={newComics} />
      <Divider>TRUYỆN VỪA CẬP NHẬT</Divider>
      <ComicsListMain comicResponse={recentUpdatedComics} />
    </div>
  )
})