import { ComicsResponse } from "../../../types/Comic"
import { CustomizeComicsInfinityList } from "../../Customizes"

type ContentBoyComicsProps = {
  comicsResponse: ComicsResponse,
  loading: boolean,
  getComics: (page?: number) => Promise<void>
}

export const ContentBoyComics : React.FC<ContentBoyComicsProps> = ({comicsResponse, loading, getComics}) => {
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