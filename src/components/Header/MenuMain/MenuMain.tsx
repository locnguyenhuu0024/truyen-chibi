import React from 'react';
import { Menu, MenuProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { BarsOutlined, FireOutlined, HomeOutlined, StarOutlined } from '@ant-design/icons';
import { Genre } from '../../../types/Genres';
import { BrightColorPalette } from '../../../styles/palette';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Link } from 'react-router-dom';
import { RouteComicEnums as RouteComics } from '../../../types/Route';
import useScreenSize from '../../../utils/screenWidth';

type MenuMainProps = {
  genres: Genre[] | null
  onClickItemMenu: () => void
}

const menuMain = (genres: Genre[] | null) : MenuProps['items'] => {
  return ([
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to={RouteComics.Home}>Trang chủ</Link>,
    },
    {
      key: 'hot',
      icon: <FireOutlined />,
      label: <Link to='#'>Truyện HOT</Link>,
    },
    {
      key: 'new',
      icon: <StarOutlined />,
      label: <Link to='#'>Trang mới</Link>,
    },
    {
      key: 'genres',
      icon: <BarsOutlined />,
      label: 'Thể loại',
      children: genres?.map((genre): ItemType => ({
        key: genre.id,
        label: <Link to='#'>{genre.name}</Link>
      }))
    },
  ])
}
export const MenuMain: React.FC<MenuMainProps> = observer(({genres, onClickItemMenu}) => {
  const { isMobile } = useScreenSize()
  
  return (
    <Menu 
      style={{backgroundColor: BrightColorPalette.Primary, color: '#FFFFFF'}} 
      mode={isMobile ? 'inline' : 'horizontal'} 
      items={menuMain(genres)} 
      onClick={onClickItemMenu}
    />
  );
});