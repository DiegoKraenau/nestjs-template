import { Expose } from 'class-transformer';

export class BookDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  email: string;
}
