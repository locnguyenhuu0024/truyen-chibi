import { makeAutoObservable } from 'mobx'
import { 
  ChapterResponse, 
  ComicDetail, ComicsResponse, 
  RecommendComic 
} from '../types/Comic'
import * as comicsApi from '../apis/comicsApi'
import { Genre } from '../types/Genres'

export class ComicStore {
  topComics: ComicsResponse = {
    comics: [],
    total_pages: 0,
    current_page: 0
  } 
  recentUpdatedComics: ComicsResponse = {
    comics: [],
    total_pages: 0,
    current_page: 0
  }
  genres: Genre[] | null = null
  newComics: ComicsResponse = {
    comics: [],
    total_pages: 0,
    current_page: 0
  }
  recommendComics: RecommendComic[] = []
  comicDetail: ComicDetail = {
    title: '',
    thumbnail: '',
    description: '',
    authors: '',
    status: '',
    genres: [],
    total_views: 0,
    followers: 0,
    chapters: [],
    id: '',
    other_names: []
  }
  singleChapter: ChapterResponse = {
    images: [],
    chapters: [],
    chapter_name: '',
    comic_name: ''
  }
  trendingComics: ComicsResponse = {
    comics: [],
    total_pages: 0,
    current_page: 0
  }
  comicsByGenre: ComicsResponse = {
    comics: [],
    total_pages: 0,
    current_page: 0
  }
  boyComics: ComicsResponse = {
    comics: [],
    total_pages: 0,
    current_page: 0
  }
  girlComics: ComicsResponse = {
    comics: [],
    total_pages: 0,
    current_page: 0
  }

  constructor() {
    makeAutoObservable(this)
  }

  // Comics
  getTopComics = async (page?: number, status?: string) => {
    const response = await comicsApi.getTopComics(page, status)
    this.setTopCommics(response)
  }

  getNewComics = async (page?: number, status?: string) => {
    const response = await comicsApi.getNewComics(page, status)
    this.setNewComics(response)
  }

  getRecommendComics = async () => {
    const response = await comicsApi.getRecommendComics()
    this.setRecommendComics(response)
  }

  getRecentUpdatedComics = async (page?: number) => {
    const response = await comicsApi.getRecentUpdateComics(page)
    this.setRecentUpdatedComics(response)
  }

  getComicDetail = async (comicId: string) => {
    const response = await comicsApi.getComicDetail(comicId)
    this.setComicDetail(response)
  }

  getSingleChapter = async (comicId: string, chapterId: string) => {
    const response = await comicsApi.getSingleChapter(comicId, chapterId)
    this.setChapterResponse(response)
  }

  getTrendComics = async (page?: number) => {
    const response = await comicsApi.getTrendingComics(page)
    this.setTrendingComics(response)
  }

  getComicsByGenre = async (genre: string) => {
    const response = await comicsApi.getComicsByGenre(genre)
    this.setComicsByGenre(response)
  }

  getBoyComics = async (page?: number) => {
    const response = await comicsApi.getBoyComics(page)
    this.setBoyComics(response)
  }

  getGirlComics = async (page?: number) => {
    const response = await comicsApi.getGirlComics(page)
    this.setGirlComics(response)
  }

  // Set

  setTopCommics = (topComics : ComicsResponse) => {
    this.topComics = topComics
  }

  setNewComics = (newComics: ComicsResponse) => {
    this.newComics = newComics
  }

  setRecommendComics = (recommendComics: RecommendComic[]) => {
    this.recommendComics = recommendComics
  }

  setRecentUpdatedComics = (recentUpdatedComics: ComicsResponse) => {
    this.recentUpdatedComics = recentUpdatedComics
  }

  setComicDetail = (comicDetail: ComicDetail) => {
    this.comicDetail = comicDetail
  }

  setChapterResponse = (singleChapter: ChapterResponse) => {
    this.singleChapter = singleChapter
  }

  setTrendingComics = (trendingComics: ComicsResponse) => {
    this.trendingComics = trendingComics
  }

  setComicsByGenre = (comicsByGenre: ComicsResponse) => {
    this.comicsByGenre = comicsByGenre
  }

  setBoyComics = (boyComics: ComicsResponse) => {
    this.boyComics = boyComics
  }

  setGirlComics = (girlComics: ComicsResponse) => {
    this.girlComics = girlComics
  }

  // Genres
  getGenres = async () => {
    const response = await comicsApi.getGenres()
    this.setGenres(response)
  }

  setGenres = (genres: Genre[] | null) => {
    this.genres = genres
  }
}
