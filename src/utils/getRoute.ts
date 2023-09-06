import { RouteComicEnums } from "../types/Route"

export const getSingleChapterPath = (comicId: string, chapterId: string) => (
  `${RouteComicEnums.Comics}/${comicId}${RouteComicEnums.Chapters}/${chapterId}`
)

export const getComicDetail = (comicId: string) => (
  `${RouteComicEnums.Comics}/${comicId}`
)

export const getComicGenre = (genreId: string) => (
  `${RouteComicEnums.Genres}/${genreId}`
)

export const getTrendComic = () => (
  `${RouteComicEnums.Trending}`
)

export const getNewComic = () => (
  `${RouteComicEnums.NewComics}`
)