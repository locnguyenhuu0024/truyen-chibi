import { Link } from "react-router-dom"
import { Comic } from "../../../../types/Comic"
import useScreenSize from "../../../../utils/screenWidth"
import { CustomizeComicsList } from "../../../Customizes"
import { RouteComicEnums } from "../../../../types/Route"
import { Button } from "antd"

type TrendingComicsListProps = {
  trendingComics: Comic[],
  loading: boolean,
}
export const TrendingComicsList : React.FC<TrendingComicsListProps> = ({trendingComics, loading}) => {
  const {isMobile} = useScreenSize()
  return (
    <>
      <CustomizeComicsList comics={trendingComics} isMobile={isMobile} loading={loading} />
      <Link to={RouteComicEnums.Trending}>
        <Button danger ghost>Xem thêm...</Button>
      </Link>
    </>
  )
}