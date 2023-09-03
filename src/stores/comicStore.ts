import { makeAutoObservable } from 'mobx';
import { ChapterResponse, Comic, ComicDetail, ComicsResponse, RecommendComic } from '../types/Comic';
import { getComicDetail, getGenres, getNewComics, getRecentUpdateComics, getRecommendComics, getSingleChapter, getTopComics } from '../apis/comicsApi';
import { Genre } from '../types/Genres';

export class ComicStore {
  topComics: ComicsResponse = {
    comics: [],
    total_pages: 0,
    current_page: 0
  }; 
  recentUpdatedComics: ComicsResponse = {
    comics: [],
    total_pages: 0,
    current_page: 0
  }
  genres: Genre[] | null = null;
  newComics: Comic[] = [];
  recommendComics: RecommendComic[] = [];
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
  };
  singleChapter: ChapterResponse = {
    images: [],
    chapters: [],
    chapter_name: '',
    comic_name: ''
  }

  constructor() {
    makeAutoObservable(this);
  }

  // Comics
  getTopComics = async (page?: number, status?: string) => {
    const response = await getTopComics(page, status);
    this.setTopCommics(response);
  };

  getNewComics = async (page?: number, status?: string) => {
    const response = await getNewComics(page, status);
    this.setNewComics(response.comics)
  }

  getRecommendComics = async () => {
    const response = await getRecommendComics();
    this.setRecommendComics(response)
  }

  getRecentUpdatedComics = async (page?: number) => {
    const response = await getRecentUpdateComics(page)
    this.setRecentUpdatedComics(response)
  }

  getComicDetail = async (comicId: string) => {
    const response = await getComicDetail(comicId)
    this.setComicDetail(response)
  }

  getSingleChapter = async (comicId: string, chapterId: string) => {
    const response = await getSingleChapter(comicId, chapterId)
    this.setChapterResponse(response)
  }

  // Set

  setTopCommics = (topComics : ComicsResponse) => {
    this.topComics = topComics;
  }

  setNewComics = (newComics: Comic[]) => {
    this.newComics = newComics;
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

  // Genres
  getGenres = async () => {
    const response = await getGenres();
    this.setGenres(response);
  }

  setGenres = (genres: Genre[] | null) => {
    this.genres = genres
  }
}
