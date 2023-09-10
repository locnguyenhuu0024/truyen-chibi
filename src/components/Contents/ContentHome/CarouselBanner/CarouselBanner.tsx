import { Carousel } from "antd"
import { observer } from "mobx-react-lite";
import { Banner } from "./Banner";
import { LoadingBanner } from "./LoadingBanner";
import './index.css'
import { ComicsResponse } from "../../../../types/Comic";
import { Link } from "react-router-dom";
import { getComicDetail } from "../../../../utils/getRoute";

type BannerProps = {
  comicsResponse: ComicsResponse
}

export const CarouselBanner : React.FC<BannerProps> = observer(({comicsResponse}) => {
  const {comics} = comicsResponse
  return (
    <>
      <Carousel dots={false} effect="fade" autoplay>
        {
          comics?.length <= 0
            ? <LoadingBanner />
            : comics?.map((comic) => (
              <Link key={comic.id} to={`${getComicDetail(comic.id)}`}><Banner comic={comic} /></Link>
            ))
        }
      </Carousel>
    </>
  )
})