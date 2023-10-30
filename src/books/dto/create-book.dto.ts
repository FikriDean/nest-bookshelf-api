import { IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateBookDto {
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
