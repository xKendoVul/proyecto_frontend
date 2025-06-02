export interface Genre {
  id: number
  name: string
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface GenreData {
  id: number;
  name: string;
}

export interface GenreResponse {
  data: Genre[];
  total: number;
}