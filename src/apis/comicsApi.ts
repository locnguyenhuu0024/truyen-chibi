import axios from 'axios';
import { ChapterResponse, ComicDetail, ComicsResponse, RecommendComic, SuggestionSearch } from '../types/Comic';
import { Genre } from '../types/Genres';

const baseURL = 'https://comics-api.vercel.app';

const comicsApi = axios.create({
  baseURL,
});


export const trendingComics = (page?: number) => {
  return comicsApi
    .get('/trending-comics', { params: { page } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getGenres = () => {
  return comicsApi
    .get<Genre[]>('/genres')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getComicsByGenre = (genreId: string) => {
  return comicsApi
    .get(`/genres/${genreId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const searchComics = (query: string, page?: number) => {
  return comicsApi
    .get<ComicsResponse>('/search', { params: { q: query, page } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const searchSuggest = (query: string) => {
  return comicsApi
    .get<SuggestionSearch[]>('/search-suggest', { params: { q: query } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getRecommendComics = () => {
  return comicsApi
    .get<RecommendComic[]>('/recommend-comics')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getNewComics = (page?: number, status?: string) => {
  return comicsApi
    .get<ComicsResponse>('/new-comics', { params: { page, status } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getBoyComics = (page?: number) => {
  return comicsApi
    .get('/boy-comics', { params: { page } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getGirlComics = (page?: number) => {
  return comicsApi
    .get('/girl-comics', { params: { page } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getCompletedComics = (page?: number) => {
  return comicsApi
    .get('/completed-comics', { params: { page } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getRecentUpdateComics = (page?: number) => {
  return comicsApi
    .get<ComicsResponse>('/recent-update-comics', { params: { page } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getComicDetail = (comicId: string) => {
  return comicsApi
    .get<ComicDetail>(`/comics/${comicId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getComicChapters = (comicId: string) => {
  return comicsApi
    .get(`/comics/${comicId}/chapters`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getSingleChapter = (comicId: string, chapterId: string) => {
  return comicsApi
    .get<ChapterResponse>(`/comics/${comicId}/chapters/${chapterId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getTopComics = (page?: number, status?: string) => {
  return comicsApi
    .get<ComicsResponse>('/top', { params: { page, status } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getDailyTopComics = (page?: number, status?: string) => {
  return comicsApi
    .get('/top/daily', { params: { page, status } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getWeeklyTopComics = (page?: number, status?: string) => {
  return comicsApi
    .get('/top/weekly', { params: { page, status } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getMonthlyTopComics = (page?: number, status?: string) => {
  return comicsApi
    .get('/top/monthly', { params: { page, status } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getTopChapterComics = (page?: number, status?: string) => {
  return comicsApi
    .get('/top/chapter', { params: { page, status } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getTopFollowComics = (page?: number, status?: string) => {
  return comicsApi
    .get('/top/follow', { params: { page, status } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getTopCommentComics = (page?: number, status?: string) => {
  return comicsApi
    .get('/top/comment', { params: { page, status } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
