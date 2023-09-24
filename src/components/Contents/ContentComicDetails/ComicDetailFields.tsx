import { Col, Row, Image, Descriptions, Space, Button, DescriptionsProps, Skeleton } from "antd"
import { CustomizeParagraph, CustomizeTag, CustomizeText, CustomizeTitle } from "../../Customizes"
import { EyeOutlined, UserAddOutlined } from "@ant-design/icons"
import { ComicDetail, FavoriteComic, StatusEnums } from "../../../types/Comic";
import useScreenSize from "../../../utils/screenWidth";
import { emptyImage } from "../../../types/Route";
import { addFavoriteComics, removeFavoriteComics } from "../../../apis/firestoreApi";
import { useRootStore } from "../../../stores";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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

export const ComicDetailFields : React.FC<ComicDetailFieldsProps> = observer(({comicDetail, loading}) => {
  const { isMobile } = useScreenSize()
  const {comicId} = useParams()
  const {authStore, comicStore} = useRootStore()
  const { 
    id, thumbnail, title, total_views, description
  } = comicDetail
  const {user} = authStore
  const {favoriteComics} = comicStore
  const [isFollowed, setIsFollowed] = useState<boolean>(false)

  useEffect(() => {
    const foundComic = favoriteComics.find((fc) => fc.comicId === comicId)
    setIsFollowed(foundComic ? true : false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const followComic = async () => {
    const data: FavoriteComic = {
      comicId: id,
      comicDescription: description,
      comicName: title,
      comicThumbnail: thumbnail
    }
    
    if(!user?.uid || !comicId) return

    if(isFollowed){
      await removeFavoriteComics(user.uid, comicId)
      setIsFollowed(false)
    }else{
      await addFavoriteComics(user.uid || '', data)
      setIsFollowed(true)
    }
  }
  
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
                <Button icon={<EyeOutlined />} type='default' ghost danger disabled>{`${total_views}`}</Button>
                <Button 
                  icon={<UserAddOutlined />} 
                  type='primary' 
                  onClick={followComic} danger
                >
                  {
                    !isFollowed ? 'Theo dõi' : 'Đã theo dõi'
                  }
                </Button>
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
                <Button icon={<EyeOutlined />} type='default' ghost danger disabled>{`${total_views}`}</Button>
                <Button 
                  icon={<UserAddOutlined />} 
                  type='primary' 
                  onClick={followComic} 
                  danger
                >
                  {
                    !isFollowed ? 'Theo dõi' : 'Đã theo dõi'
                  }
                </Button>
              </Space>
            </Col></Row>}
            size={'small'}
            items={returnItems(comicDetail)}
          />
        </Space>
      </Skeleton>
  )
})