import { ComicsResponse } from "../../../types/Comic"
import useScreenSize from "../../../utils/screenWidth"
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
  const {isMobile} = useScreenSize()
  return (
    <>
      <CustomizeComicsList comics={comics} isMobile={isMobile} loading={loading} />
    </>
  )
}