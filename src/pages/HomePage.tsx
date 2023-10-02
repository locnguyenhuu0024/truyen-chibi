import { observer } from "mobx-react-lite";
import { ContentHome } from "../components/Contents";
import { Content } from "antd/es/layout/layout";
import {Helmet} from "react-helmet";
import { BrightColorPalette as Palette } from "../styles/palette";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: Palette.Background
};

export const HomePage : React.FC = observer(() => {
  return (
    <>
      <Helmet>
        <title>Trang chủ | Truyện Chibi! 🌟</title>
        <meta
          name="description"
          content="Truyện Chibi là nơi bạn sẽ khám phá thế giới truyện tranh dễ thương độc đáo, cùng những câu chuyện tuyệt vời. Với bộ sưu tập đa dạng và chất lượng, chúng tôi mang đến cho bạn những giây phút giải trí thú vị. Khám phá ngay và cùng chia sẻ niềm đam mê truyện tranh tại Truyện Chibi! 📚✨"
        />
        <meta property="og:image" content={'/truyen-chibi.png'} />
      </Helmet>
      <Content style={contentStyle}>
        <ContentHome />
      </Content>
    </>
  )
})