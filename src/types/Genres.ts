export interface Genre {
  id: string;
  name: GenreEnums;
  desscription: string;
}

export enum GenreEnums {
  All = 'Tất cả',
  Action = 'Action',
  Adult = 'Adult',
  Adventure = 'Adventure',
  Anime = 'Anime',
  ChuyenSinh = 'Chuyển Sinh',
  Comedy = 'Comedy',
  Comic = 'Comic',
  Cooking = 'Cooking',
  CoDai = 'Cổ Đại',
  Doujinshi = 'Doujinshi',
  Drama = 'Drama',
  DamMy = 'Đam Mỹ',
  Ecchi = 'Ecchi',
  Fantasy = 'Fantasy',
  GenderBender = 'Gender Bender',
  Harem = 'Harem',
  Historical = 'Historical',
  Horror = 'Horror',
  Josei = 'Josei',
  LiveAction = 'Live action',
  Manga = 'Manga',
  Manhua = 'Manhua',
  Manhwa = 'Manhwa',
  MartialArts = 'Martial Arts',
  Mature = 'Mature',
  Mecha = 'Mecha',
  Mystery = 'Mystery',
  NgonTinh = 'Ngôn Tình',
  OneShot = 'One shot',
  Psychological = 'Psychological',
  Romance = 'Romance',
  SchoolLife = 'School Life',
  SciFi = 'Sci-fi',
  Seinen = 'Seinen',
  Shoujo = 'Shoujo',
  ShoujoAi = 'Shoujo Ai',
  Shounen = 'Shounen',
  ShounenAi = 'Shounen Ai',
  SliceOfLife = 'Slice of Life',
  Smut = 'Smut',
  SoftYaoi = 'Soft Yaoi',
  SoftYuri = 'Soft Yuri',
  Sports = 'Sports',
  Supernatural = 'Supernatural',
  ThieuNhi = 'Thiếu Nhi',
  Tragedy = 'Tragedy',
  TrinhTham = 'Trinh Thám',
  TruyenScan = 'Truyện scan',
  TruyenMau = 'Truyện Màu',
  Webtoon = 'Webtoon',
  XuyenKhong = 'Xuyên Không',
}

export type GenreColors = {
  [key in GenreEnums]: string;
};
