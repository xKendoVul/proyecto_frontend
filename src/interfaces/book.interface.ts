import { Genre } from "./genre.interface";
import { Author } from "./author.interface";
import { Publisher } from "./publisher.interface";

export interface Book {
    id: number;
    title: string;
    publication_year: number;
    genre_id: Genre[];
    author_id: Author;
    publisher_id: Publisher;
    isAvailable: boolean;
    image?: string;
    total_copies: number;
    available_copies?: number;
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
    genre_id: Genre[];
    author_id: Author;
    publisher_id: Publisher;
    user?: string;
    isAvailable?: boolean;
    image?: string;
    total_copies: number;
    available_copies: number;
}

export interface BookResponse {
    data: Book[];
    total: number;
}