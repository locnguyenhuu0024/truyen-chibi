import { Col, Row, Image, Descriptions, Space, Button, DescriptionsProps } from "antd"
import { CustomizeParagraph, CustomizeTag, CustomizeText, CustomizeTitle } from "../../Customizes"
import { EyeOutlined, UserAddOutlined } from "@ant-design/icons"
import { BrightColorPalette as Palette } from "../../../styles/palette";
import { ComicDetail, StatusEnums } from "../../../types/Comic";

type ComicDetailFieldsProps = {
  comicDetail: ComicDetail
}

const returnItems = (comicDetail: ComicDetail): DescriptionsProps['items'] => ([
  {
    key: 'author',
    label: 'Tác giả',
    children: comicDetail.authors,
  },
  {
    key: 'status',
    label: 'Trạng thái',
    children: comicDetail.status === 'Completed' ? StatusEnums.Completed : StatusEnums.OnGoing
  },
  {
    key: '',
    label: null,
    children: null
  },
  {
    key: 'genres',
    label: 'Thể loại',
    children: (
      <Row justify={'start'} align={'middle'}>
        {
          comicDetail.genres.map(genre => <Col key={genre.id}>
            <CustomizeTag genre={genre} />
          </Col>)
        }
      </Row>
    )
  },
  {
    key: '',
    label: null,
    children: null
  },
  {
    key: '',
    label: null,
    children: null
  },
  {
    key: 'description',
    label: 'Mô tả',
    children: <CustomizeParagraph value={comicDetail.description} />
  },
]);

export const ComicDetailFields : React.FC<ComicDetailFieldsProps> = ({comicDetail}) => {
  return (
    <Row>
      <Col span={8}>
        <Image alt={comicDetail.id} src={comicDetail.thumbnail} width={280} height={400} preview={false} />
      </Col>
      <Col span={16}>
        <Descriptions
          title={<Row justify={'start'}><Col span={24}>
            <CustomizeTitle title={comicDetail.title} />
            {
              comicDetail.other_names.length > 0 
                && <CustomizeText style={{width: '100%', color: Palette.SecondaryText}} value='Tên khác: ' />
            }
            <Space style={{width: '100%', textAlign: 'start'}} direction="vertical">
              {
                comicDetail.other_names.map(otherName => (
                  <>
                    <CustomizeText key={otherName} style={{color: Palette.SecondaryText}} value={otherName} />
                  </>
                ))
              }
            </Space>
          </Col></Row>}
          size={'small'}
          items={returnItems(comicDetail)}
          // layout="vertical"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          extra={<Space>
            <Button icon={<EyeOutlined />} type='default' ghost danger disabled>{` ${comicDetail.total_views}`}</Button>
            <Button icon={<UserAddOutlined />} type='default' ghost danger disabled>{` ${comicDetail.followers}`}</Button>
          </Space>}
          // bordered
        />
      </Col>
    </Row>
  )
}