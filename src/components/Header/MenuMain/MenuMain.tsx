import React from "react";
import { Menu, MenuProps } from "antd";
import { observer } from "mobx-react-lite";
import {
  BarsOutlined,
  FireOutlined,
  HomeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Genre } from "../../../types/Genres";
import { BrightColorPalette } from "../../../styles/palette";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Link } from "react-router-dom";
import { RouteComicEnums as RouteComics } from "../../../types/Route";
import useScreenSize from "../../../utils/screenWidth";
import {
  getComicGenre,
  getNewComic,
  getTrendComic,
} from "../../../utils/getRoute";
import "./menuMain.css";

type MenuMainProps = {
  genres: Genre[] | null;
  onClickItemMenu: () => void;
  isOnHeader?: boolean;
};

const menuMain = (genres: Genre[] | null): MenuProps["items"] => {
  return [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: (
        <>
          <Link to={RouteComics.Home}>Trang chủ</Link>
        </>
      ),
    },
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
    {
      key: "trending",
      icon: <FireOutlined />,
      label: (
        <>
          <Link to={getTrendComic()}>Trending</Link>
        </>
      ),
    },
    {
      key: "new",
      icon: <StarOutlined />,
      label: (
        <>
          <Link to={getNewComic()}>Truyện mới</Link>
        </>
      ),
    },
    {
      key: "boy",
      icon: <PlusCircleOutlined />,
      label: (
        <>
          <Link to={RouteComics.BoyComics}>Boy</Link>
        </>
      ),
    },
    {
      key: "girl",
      icon: <MinusCircleOutlined />,
      label: (
        <>
          <Link to={RouteComics.GirlComics}>Girl</Link>
        </>
      ),
    },
  ];
};
export const MenuMain: React.FC<MenuMainProps> = observer(
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
        items={menuMain(genres)}
        onClick={onClickItemMenu}
      />
    );
  }
);
