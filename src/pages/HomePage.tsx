import { observer } from "mobx-react-lite";
import { ContentHome } from "../components/Contents/ContentHome";
import { Content } from "antd/es/layout/layout";
import { BrightColorPalette as Palette } from "../styles/palette";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: Palette.Background
};

export const HomePage : React.FC = observer(() => {
  return (
    <Content style={contentStyle}>
      <ContentHome />
    </Content>
  )
})