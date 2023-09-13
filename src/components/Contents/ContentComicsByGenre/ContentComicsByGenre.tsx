import { ComicsResponse } from "../../../types/Comic"
import { CustomizeComicsList } from "../../Customizes/CustomizeComicsList"

type ContentComicsByGenreProps = {
  comicsResponse: ComicsResponse,
  loading: boolean,
}


export const ContentComicsByGenre : React.FC<ContentComicsByGenreProps> = ({
  comicsResponse, 
  loading, 
}) => {
  const {comics} = comicsResponse
  return (
    <>
      <CustomizeComicsList comics={comics} loading={loading} />
    </>
  )
}