import { ComicsResponse } from "../../../types/Comic"
import { CustomizeComicsInfinityList } from "../../Customizes"

type ContentNewComicsProps = {
  comics: ComicsResponse,
  loading: boolean,
  getNewComic?: (page?: number, status?: string) => Promise<void>
}

export const ContentNewComics : React.FC<ContentNewComicsProps> = ({comics, loading, getNewComic}) => {
  return (
    <>
      <CustomizeComicsInfinityList 
        comicResponse={comics} 
        loading={loading!} 
        getComicList={getNewComic} 
        needToLoad={true}
      />
    </>
  )
}