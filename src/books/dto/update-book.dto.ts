import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

import { IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsNumber()
  pageCount: number;
  readPage: number;

  @IsNotEmpty()
  name: string;
  year: string;
  author: string;
  summary: string;
  publisher: string;
  insertedAt: string;

  @IsBoolean()
  reading: boolean;
}
