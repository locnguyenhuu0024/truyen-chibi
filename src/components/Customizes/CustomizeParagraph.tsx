import Paragraph from "antd/es/typography/Paragraph"
import { BrightColorPalette } from "../../styles/palette"

type CustomizeParagraphProps = {
  value?: string,
  style?: React.CSSProperties,
  limitRow?: number
}

const paragraphStyle: React.CSSProperties = {
  width: '100%',
  fontSize: 14, 
  textAlign: 'start',
  color: BrightColorPalette.CarouselParagraph
}

export const CustomizeParagraph: React.FC<CustomizeParagraphProps> = ({value, style, limitRow}) => {
  return (
    <Paragraph 
      style={{...paragraphStyle, ...style}}
      ellipsis={{rows: limitRow || 5}}
    >
      {value || `Hãy tận hưởng bộ truyện này nhé!`}
    </Paragraph>
  )
}