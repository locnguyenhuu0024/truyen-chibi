import Text from "antd/es/typography/Text"
import { BrightColorPalette } from "../../styles/palette"

const textStyle: React.CSSProperties = {
  width: '100%',
  fontSize: 12, 
  textAlign: 'start',
  color: BrightColorPalette.CarouselText
}

type CustomizeTextProps = {
  value: string,
  style?: React.CSSProperties
}

export const CustomizeText : React.FC<CustomizeTextProps> = ({value, style}) => {
  return (
    <Text style={{...textStyle, ...style}} ellipsis>{value}</Text>
  )
}