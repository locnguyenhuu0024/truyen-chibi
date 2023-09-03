import { Col, Image, Row, Space } from "antd";
import { Comic } from "../../../../types/Comic";
import { observer } from "mobx-react-lite";
import { BrightColorPalette as Palette } from "../../../../styles/palette";
import { CustomizeParagraph, CustomizeTag, CustomizeText, CustomizeTitle } from "../../../Customizes";

const contentStyle: React.CSSProperties = {
  height: 400,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: Palette.Background,
};

type BannerProps = {
  comic: Comic | null
}

export const Banner : React.FC<BannerProps> = observer(({comic}) => {

  return (
    <div onClick={() => {}} style={{...contentStyle}} key={comic?.id}>
      <Row justify={'space-around'} align={'top'} style={{width: '100%'}}>
        <Col span={6}>
          <Image preview={false} style={{width: 200, height: 'auto'}} src={comic?.thumbnail} />
        </Col>
        <Col span={18}>
          <Row justify={'start'}>
            <Space direction='vertical'>
              <Row justify={'start'} align={'middle'}>
                <CustomizeTitle title={comic?.title} />
                <CustomizeText style={{color: Palette.Accent, fontWeight: 'bold'}} value={`Chapter mới nhất: ${comic?.last_chapter.name}`} />
              </Row>
              <CustomizeParagraph value={comic?.short_description} />
              <Row justify={'start'}>
                <Space size={'middle'}>
                  <CustomizeText style={{color: Palette.Accent}} value="Thể loại: " />
                  <Space size={'small'}>
                    {
                      comic?.genres?.map(genre => <CustomizeTag key={genre.id} genre={genre} />)
                    }
                  </Space>
                </Space>
              </Row>
            </Space>
          </Row>
        </Col>
      </Row>
    </div>
  )
})