import Title from "antd/es/typography/Title"
import { BrightColorPalette } from "../../styles/palette";

type CustomizeTitleProps = {
  style?: React.CSSProperties,
  title: string | undefined,
  ellipsis?: boolean
}

const titleStyle: React.CSSProperties = {
  width: '100%',
  fontSize: 20, 
  fontWeight: 'bold', 
  textAlign: 'start',
  color: BrightColorPalette.CarouselTitle
};

export const CustomizeTitle : React.FC<CustomizeTitleProps> = ({style, title, ...props}) => {
  return (
    <Title style={{...titleStyle, ...style}} {...props}>{title}</Title>
  )
}