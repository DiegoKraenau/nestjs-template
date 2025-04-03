import { IsString, IsEmail, Length } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsEmail()
  email: string;
}
