import { ComicsResponse } from "../../../types/Comic"
import { CustomizeComicsInfinityList } from "../../Customizes"

type ContentGirlComicsProps = {
  comicsResponse: ComicsResponse,
  loading: boolean,
  getComics: (page?: number) => Promise<void>
}

export const ContentGirlComics : React.FC<ContentGirlComicsProps> = ({comicsResponse, loading, getComics}) => {
  return (
    <>
      <CustomizeComicsInfinityList 
        comicResponse={comicsResponse} 
        loading={loading} 
        getComicList={getComics} 
        needToLoad={true} 
      />
    </>
  )
}