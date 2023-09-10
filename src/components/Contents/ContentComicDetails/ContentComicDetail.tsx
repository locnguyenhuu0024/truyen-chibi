import { Col, Row } from "antd";
import { ComicDetail } from "../../../types/Comic";
import { ComicDetailFields } from "./ComicDetailFields";
import { ComicChapterList } from "./ComicChapterList";
import './index.css'

type ContentComicDetailProps = {
  comicDetail: ComicDetail,
  loading?: boolean
}

export const ContentComicDetail : React.FC<ContentComicDetailProps> = ({comicDetail, loading}) => {

  return (
    <div
      style={{
        width: '100%',
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <Row style={{padding: 16}}>
        <Col span={24}>
          <ComicDetailFields comicDetail={comicDetail} loading={loading} />
          <ComicChapterList comicId={comicDetail.id} chapters={comicDetail.chapters} loading={loading} />
        </Col>
      </Row>
    </div>
  )
}