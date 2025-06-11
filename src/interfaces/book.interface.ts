export interface Book {
    id: number;
    title: string;
    publication_year: number;
    genre_id: number[];
    author_id: number;
    publisher_id: number;
    isAvaliable: boolean;
    //user?: string;
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
    genre_id: number[];
    author_id: number;
    publisher_id: number;
    user?: string;
    isAvailable?: boolean;
    image?: string;
}

export interface BookResponse {
    data: Book[];
    total: number;
}