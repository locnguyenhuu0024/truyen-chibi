import { observer } from "mobx-react-lite"
import { ComicsResponse } from "../../../types/Comic"
import { CustomizeComicsInfinityList } from "../../Customizes"
import { Divider } from "antd"

type ContentTrendingComicsProps = {
  comicResponse: ComicsResponse,
  getTrendingComics: (page?: number) => Promise<void>,
  loading?: boolean
}

export const ContentTrendingComics : React.FC<ContentTrendingComicsProps> = observer(({
  comicResponse, 
  getTrendingComics,
  loading
}) => {
  return (
    <>
      <Divider>TRUYỆN TRENDING</Divider>
      <CustomizeComicsInfinityList comicResponse={comicResponse} getComicList={getTrendingComics} loading={loading} />
    </>
  )
})