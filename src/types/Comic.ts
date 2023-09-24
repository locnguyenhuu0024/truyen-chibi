import { Genre } from "./Genres";


export interface LastChapter {
  id: number;
  name: string;
}

export interface Comic {
  id: string;
  title: string;
  thumbnail: string;
  updated_at: string;
  is_trending: boolean;
  genres: Genre[];
  short_description: string;
  other_names: string[];
  status: string;
  total_views: number;
  followers: number;
  last_chapter: LastChapter;
}

export interface RecommendComic extends Comic {
  id: string;
  title: string;
  thumbnail: string;
  updated_at: string;
  lastest_chapter: LastChapter;
}

export interface ComicsResponse {
  comics: Comic[];
  total_pages: number;
  current_page: number;
}

export interface SuggestionSearch {
  id: string;
  title: string;
  thumbnail: string;
  lastest_chapter: string;
  genres: Genre[];
  authors: string[];
}

export type FavoriteComic = {
  comicId: string,
  comicDescription: string,
  comicName: string,
  comicThumbnail: string
}

export type Chapter = {
  id: string;
  name: string;
};

export type ComicDetail = {
  title: string;
  thumbnail: string;
  description: string;
  authors: string;
  status: string;
  genres: Genre[];
  total_views: number;
  followers: number;
  chapters: Chapter[];
  id: string;
  other_names: string[];
};

export type Image = {
  page: number;
  src: string;
}

export type ChapterResponse = {
  images: Image[],
  chapters: Chapter[],
  chapter_name: string,
  comic_name: string
}

export enum StatusEnums {
  OnGoing = 'Đang tiến hành',
  Completed = 'Hoàn thành'
}