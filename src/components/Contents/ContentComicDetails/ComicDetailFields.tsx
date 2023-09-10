import { Col, Row, Image, Descriptions, Space, Button, DescriptionsProps, Skeleton } from "antd"
import { CustomizeParagraph, CustomizeTag, CustomizeText, CustomizeTitle } from "../../Customizes"
import { EyeOutlined, UserAddOutlined } from "@ant-design/icons"
import { ComicDetail, StatusEnums } from "../../../types/Comic";
import useScreenSize from "../../../utils/screenWidth";
import { emptyImage } from "../../../types/Route";

type ComicDetailFieldsProps = {
  comicDetail: ComicDetail,
  loading?: boolean
}

const returnItems = (comicDetail: ComicDetail): DescriptionsProps['items'] => ([
  {
    key: 'otherName',
    label: 'Tên khác',
    children: comicDetail.other_names.map((otherName, index) => <CustomizeText key={index} value={otherName}/>),
    span: 3
  },
  {
    key: 'author',
    label: 'Tác giả',
    children: comicDetail.authors,
  },
  {
    key: 'status',
    label: 'Trạng thái',
    children: comicDetail.status === 'Completed' ? StatusEnums.Completed : StatusEnums.OnGoing,
    span: 2
  },
  {
    key: 'genres',
    label: 'Thể loại',
    children: (
      <Row justify={'start'} align={'middle'}>
        {
          comicDetail.genres.map(genre => 
            <Col key={genre.id}>
              <CustomizeTag genre={genre} />
            </Col>
          )
        }
      </Row>
    ),
    span: 3
  },
  {
    key: 'description',
    label: 'Mô tả',
    children: <CustomizeParagraph value={comicDetail.description} />,
    span: 3
  },
]);

export const ComicDetailFields : React.FC<ComicDetailFieldsProps> = ({comicDetail, loading}) => {
  const { isMobile } = useScreenSize()
  const { 
    id, thumbnail, title, total_views, followers 
  } = comicDetail
  
  return (
    !isMobile 
      ? 
      <Skeleton loading={loading} title paragraph active avatar>
        <Row>
          <Col span={8}>
            <Image alt={id} src={thumbnail} width={280} height={400} preview={false} fallback={emptyImage} />
          </Col>
          <Col span={16}>
            <Descriptions
              title={<CustomizeTitle title={title} ellipsis={true} />}
              size={'small'}
              items={returnItems(comicDetail)}
              extra={<Space>
                <Button icon={<EyeOutlined />} type='default' ghost danger disabled>{` ${total_views}`}</Button>
                <Button icon={<UserAddOutlined />} type='default' ghost danger disabled>{` ${followers}`}</Button>
              </Space>}
            />
          </Col>
        </Row>
      </Skeleton>
      : 
      <Skeleton loading={loading} active avatar>
        <Space direction="vertical" style={{width: '100%'}}>
          <Image alt={id} src={thumbnail} width={180} height={280} preview={false} fallback={emptyImage} />
          <Descriptions
            title={<Row justify={'start'}><Col span={24}>
              <CustomizeTitle title={title} ellipsis={true} />
              <Space>
                <Button icon={<EyeOutlined />} type='default' ghost danger disabled>{` ${total_views}`}</Button>
                <Button icon={<UserAddOutlined />} type='default' ghost danger disabled>{` ${followers}`}</Button>
              </Space>
            </Col></Row>}
            size={'small'}
            items={returnItems(comicDetail)}
          />
        </Space>
      </Skeleton>
  )
}