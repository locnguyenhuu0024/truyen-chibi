import { Tag } from "antd"
import { getGenreColor } from "../../utils/getGenreColor"
import { Genre, GenreEnums } from "../../types/Genres"

type CustomizeTagProps = {
  genre: Genre | string,
  style?: React.CSSProperties,
}

export const CustomizeTag : React.FC<CustomizeTagProps> = ({genre, style}) => {
  const isString = typeof genre === 'string'
  return (
    <Tag 
      key={`${isString ? genre : genre.id}`} 
      style={{...style, fontSize: 10}}
      color={getGenreColor(isString ? genre as GenreEnums : genre.name)}
    >{isString ? genre : genre.name.toString()}</Tag>
  )
}