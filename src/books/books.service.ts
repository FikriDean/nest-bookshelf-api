import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { nanoid } from 'nanoid';

@Injectable()
export class BooksService {
  private books: {
    id: string;
    name: string;
    year: string;
    author: string;
    summary: string;
    publisher: string;
    pageCount: number;
    readPage: number;
    finished: boolean;
    reading: boolean;
    insertedAt: string;
    updatedAt: string;
  }[] = [];

  create(createBookDto: CreateBookDto) {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = createBookDto;

    let id: string;
    let insertedAt: string;
    let updatedAt: string;
    let finished: boolean;
    let isSuccess: boolean;

    id = nanoid(16);
    insertedAt = new Date().toISOString();
    updatedAt = insertedAt;

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    if (readPage > pageCount) {
      return {
        status: false,
        code: 400,
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      };
    }

    this.books.push(newBook);

    isSuccess = this.books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      return {
        status: true,
        code: 201,
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      };
    }

    return {
      status: false,
      code: 500,
      message: 'Buku gagal ditambahkan',
    };
  }

  findAll(attr) {
    const { name, reading, finished } = attr;

    let copyOfBooks: any[];

    copyOfBooks = [...this.books];

    if (typeof name === 'string') {
      copyOfBooks = copyOfBooks
        .filter((b) => b.name.toUpperCase().includes(name.toUpperCase()))
        .map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        }));
    }

    if (typeof reading === 'string') {
      if (reading === '0') {
        copyOfBooks = copyOfBooks
          .filter((b) => b.reading === false)
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          }));
      } else if (reading === '1') {
        copyOfBooks = copyOfBooks
          .filter((b) => b.reading === true)
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          }));
      }
    }

    if (typeof finished === 'string') {
      if (finished === '0') {
        copyOfBooks = copyOfBooks
          .filter((b) => b.finished === false)
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          }));
      } else if (finished === '1') {
        copyOfBooks = copyOfBooks
          .filter((b) => b.finished === true)
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          }));
      }
    }

    if (
      typeof name !== 'string' &&
      typeof reading !== 'string' &&
      typeof finished !== 'string'
    ) {
      copyOfBooks = copyOfBooks.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));
    }

    return {
      status: true,
      code: 200,
      message: 'Buku-buku berhasil didapatkan',
      data: {
        books: copyOfBooks,
      },
    };
  }

  findOne(id: string) {
    let book: {
      id: string;
      name: string;
      year: string;
      author: string;
      summary: string;
      publisher: string;
      pageCount: number;
      readPage: number;
      finished: boolean;
      reading: boolean;
      insertedAt: string;
      updatedAt: string;
    };

    book = this.books.filter((b) => b.id === id)[0];

    if (!book) {
      return {
        status: false,
        code: 404,
        message: 'Buku tidak ditemukan',
      };
    }

    return {
      status: true,
      code: 200,
      message: 'Buku berhasil ditemukan',
      data: {
        book,
      },
    };
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = updateBookDto;

    if (readPage > pageCount) {
      return {
        status: false,
        code: 400,
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      };
    }

    const index = this.books.findIndex((book) => book.id === id);

    if (index === -1) {
      return {
        status: false,
        code: 404,
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      };
    }

    const updatedAt = new Date().toISOString();

    this.books[index] = {
      ...this.books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return {
      status: true,
      code: 200,
      message: 'Buku berhasil diperbarui',
      data: {
        bookId: id,
      },
    };
  }

  remove(id: string) {
    const index = this.books.findIndex((book) => book.id === id);

    if (index === -1) {
      return {
        status: false,
        code: 404,
        message: 'Buku gagal dihapus',
        data: {
          bookId: id,
        },
      };
    }

    this.books.splice(index, 1);

    return {
      status: true,
      code: 200,
      message: 'Buku berhasil dihapus',
    };
  }
}
