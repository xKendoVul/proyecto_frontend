export interface Genre {
  id: number
  name: string
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface GenreOneResponse {
  data: Genre;
}

export interface GenreData {
  id: number;
  name: string;
}

export interface GenreResponse {
  data: Genre[];
  total: number;
}