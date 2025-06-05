export interface Book {
    id: number;
    title: string;
    publication_year: number;
    genre: number[];
    author_id: number;
    publisher_id: number;
    isAvaliable: boolean;
    image?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export interface BookOneResponse {
    data: Book;
}

export interface BookData {
    id?: number;
    title: string;
    publication_year: number;
    genre: number[];
    author_id: number;
    publisher_id: number;
    isAvaliable?: boolean;
    image?: string;
}

export interface BookResponse {
    data: Book[];
    total: number;
}