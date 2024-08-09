import React from "react";
import { Menu, MenuProps } from "antd";
import { observer } from "mobx-react-lite";
import { BarsOutlined } from "@ant-design/icons";
import { Genre } from "../../../types/Genres";
import { BrightColorPalette } from "../../../styles/palette";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Link } from "react-router-dom";
import useScreenSize from "../../../utils/screenWidth";
import { getComicGenre } from "../../../utils/getRoute";
import "./menuMain.css";

type MenuMainProps = {
  genres: Genre[] | null;
  onClickItemMenu: () => void;
  isOnHeader?: boolean;
};

const menuMobileMain = (genres: Genre[] | null): MenuProps["items"] => {
  return [
    {
      key: "genres",
      icon: <BarsOutlined />,
      label: "Thể loại",
      children: genres?.map(
        (genre): ItemType => ({
          key: genre.id,
          label: (
            <>
              <Link to={getComicGenre(genre.id)}>{genre?.name}</Link>
            </>
          ),
        })
      ),
    },
  ];
};
export const MenuMobileMain: React.FC<MenuMainProps> = observer(
  ({ genres, isOnHeader, onClickItemMenu }) => {
    const { isMobile } = useScreenSize();
    const mode =
      isMobile && isOnHeader
        ? "horizontal"
        : isMobile
        ? "inline"
        : "horizontal";
    return (
      <Menu
        style={{
          backgroundColor: BrightColorPalette.Primary,
          color: "#FFFFFF",
        }}
        mode={mode}
        items={menuMobileMain(genres)}
        onClick={onClickItemMenu}
      />
    );
  }
);
