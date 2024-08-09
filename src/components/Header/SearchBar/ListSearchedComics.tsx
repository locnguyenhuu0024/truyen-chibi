import { ConfigProvider, Divider, Image, Space, Typography } from "antd";
import List from "antd/es/list";
import { Comic } from "../../../types/Comic";
import { BrightColorPalette } from "../../../styles/palette";
import { CustomizeRenderEmpty, CustomizeText } from "../../Customizes";
import { CustomizeTag } from "../../Customizes";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { getComicDetail } from "../../../utils/getRoute";
import useScreenSize from "../../../utils/screenWidth";
import { emptyImage } from "../../../types/Route";

type ListSearchedComicProps = {
  listSearchedComic: Comic[];
  onClickItemMenu?: () => void;
};

const scrollStyle = {
  height: "fit-content",
  maxHeight: "400px",
  width: 640,
  overflow: "auto",
  border: "1px solid rgba(140, 140, 140, 0.35)",
};

export const ListSearchedComic: React.FC<ListSearchedComicProps> = observer(
  ({ listSearchedComic, onClickItemMenu }) => {
    const { isMobile } = useScreenSize();

    return (
      <div style={{ ...scrollStyle, width: isMobile ? 300 : 640 }}>
        <ConfigProvider renderEmpty={CustomizeRenderEmpty}>
          <List
            style={{ padding: 8, backgroundColor: "white", borderRadius: 4 }}
            size="large"
            itemLayout="horizontal"
            dataSource={listSearchedComic}
            renderItem={(item, index) => (
              <Link
                key={`${index}-${item?.id}`}
                to={getComicDetail(item.id)}
                onClick={onClickItemMenu}
              >
                <List.Item key={`${index}-${item?.id}`}>
                  <Space direction={isMobile ? "vertical" : "horizontal"}>
                    <Image
                      width={100}
                      src={item?.thumbnail}
                      preview={false}
                      fallback={emptyImage}
                    />
                    <Space direction="vertical">
                      <Typography.Title
                        style={{
                          fontSize: isMobile ? 14 : 16,
                          fontWeight: "bold",
                          color: BrightColorPalette.Text,
                        }}
                      >
                        {item?.title}
                      </Typography.Title>
                      <CustomizeText
                        value={item.last_chapter?.name}
                        style={{ color: BrightColorPalette.Accent }}
                      />
                      <Typography.Paragraph
                        style={{
                          fontSize: isMobile ? 10 : 12,
                          color: BrightColorPalette.SecondaryText,
                        }}
                        ellipsis={{
                          rows: 3,
                          expandable: false,
                        }}
                      >
                        {item?.short_description}
                      </Typography.Paragraph>
                      {!isMobile ?? (
                        <Space size={"small"}>
                          {item.genres.map((genre) => (
                            <CustomizeTag genre={genre} />
                          ))}
                        </Space>
                      )}
                    </Space>
                    <Divider style={{ margin: "0px 0px " }}></Divider>
                  </Space>
                </List.Item>
              </Link>
            )}
          />
        </ConfigProvider>
      </div>
    );
  }
);
