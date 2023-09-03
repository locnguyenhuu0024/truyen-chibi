import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import { LoadingOutlined } from "@ant-design/icons";
import { BrightColorPalette as Palette } from "../../../../styles/palette";

const antIcon = <LoadingOutlined style={{ fontSize: 48, color: 'white' }} spin />;

const contentStyle: React.CSSProperties = {
  height: 400,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: Palette.Background,
};

export const LoadingBanner : React.FC = observer(() => {
  return (
    <div style={contentStyle}>
      <Spin indicator={antIcon} />
    </div>
  )
})