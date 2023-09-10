import { Content } from "antd/es/layout/layout";
import { BrightColorPalette as Palette } from "../styles/palette";
import { ContentComicsByGenre } from "../components/Contents";
import { useEffect, useState } from "react";
import { useRootStore } from "../stores";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import { Button, Divider, Dropdown, MenuProps } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { CustomizeText } from "../components/Customizes";
import { getComicGenre } from "../utils/getRoute";
import { Genre } from "../types/Genres";
import { Link } from "react-router-dom";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: Palette.Background
};

const genreItems = (genres: Genre[]): MenuProps['items'] => (
  genres?.map(genre => ({
    key: genre.id, 
    label: <Link to={getComicGenre(genre.id)}>{genre.name}</Link>
  }))
)

export const ComicsByGenrePage : React.FC = observer(() => {
  const {genreId} = useParams()
  const {comicStore} = useRootStore()
  const { genres, comicsByGenre, getComicsByGenre } = comicStore
  const [loading, setLoading] = useState<boolean>(true)
  const [currentGenreId, setCurrentGenre] = useState<string>('')
  const currentGenre = genres?.filter(genre => genre.id === genreId)[0]

  useEffect(() => {
    if(!genreId) return
    
    if(genreId !== currentGenreId){
      setLoading(true)
      getComicsByGenre(genreId)
      setCurrentGenre(genreId)
      const timeOutLoading = setTimeout(() => {setLoading(false)}, 3000)
      clearTimeout(timeOutLoading)
    }else{
      setTimeout(() => {setLoading(false)}, 3000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreId, currentGenreId])

  return (
    <Content style={contentStyle}>
      <Divider>Thể loại {currentGenre?.name}</Divider>
      <Dropdown 
        menu={{items: genreItems(genres!)}} 
        trigger={['click']}
      >
        <Button 
          style={{width: '100%'}} 
          icon={<UnorderedListOutlined />}
        ><CustomizeText value={currentGenre?.name as string} style={{color: Palette.SecondaryText, fontSize: 16}}/></Button>
      </Dropdown>
      <ContentComicsByGenre comicsResponse={comicsByGenre} loading={loading} />
    </Content>
  )
})