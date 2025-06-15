export interface Publisher {
  id: number
  name: string
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface PublisherOneResponse {
  data: Publisher;
}

export interface PublisherData {
  id: number;
  name: string;
}

export interface PublisherResponse {
  data: Publisher[];
  total: number;
}