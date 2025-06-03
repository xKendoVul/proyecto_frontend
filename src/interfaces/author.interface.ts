export interface Author {
  id: number
  name: string
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface AuthorOneResponse {
  data: Author;
}

export interface AuthorData {
  id: number;
  name: string;
}

export interface AuthorResponse {
  data: Author[];
  total: number;
}