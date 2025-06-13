import { Genre } from "./genre.interface";
import { Author } from "./author.interface";
import { Publisher } from "./publisher.interface";

export interface Book {
    id: number;
    title: string;
    publication_year: number;
    genre: Genre[];
    author: Author;
    publisher: Publisher;
    isAvailable: boolean;
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
    genre: Genre[];
    author: Author;
    publisher: Publisher;
    user?: string;
    isAvailable?: boolean;
    image?: string;
}

export interface BookResponse {
    data: Book[];
    total: number;
}