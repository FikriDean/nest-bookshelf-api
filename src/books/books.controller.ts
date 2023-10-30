import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  HttpException,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createBookDto: CreateBookDto) {
    let book = this.booksService.create(createBookDto);

    if (!book.status) {
      throw new HttpException(book.message, book.code);
    }

    return {
      message: book.message,
      data: book.data,
    };
  }

  @Get()
  findAll(@Query() attr: string) {
    let books = this.booksService.findAll(attr);

    if (!books.status) {
      throw new HttpException(books.message, books.code);
    }

    return {
      message: books.message,
      data: books.data,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    let book = this.booksService.findOne(id);

    if (!book.status) {
      throw new HttpException(book.message, book.code);
    }

    return {
      message: book.message,
      data: book.data,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    let book = this.booksService.update(id, updateBookDto);

    if (!book.status) {
      throw new HttpException(book.message, book.code);
    }

    return {
      message: book.message,
      data: book.data,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    let book = this.booksService.remove(id);

    if (!book.status) {
      throw new HttpException(book.message, book.code);
    }

    return {
      message: book.message,
      data: book.data,
    };
  }
}
