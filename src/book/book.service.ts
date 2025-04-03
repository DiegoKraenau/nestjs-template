import { HttpStatus, Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'src/shared/decorators/transactional.decorator';
import { BookDto, CreateBookDto } from './dtos';
import { CustomException } from 'src/domain/custom-exception';
import { FAILED_ADDED, TRY_AGAIN } from 'src/domain';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  @Transactional()
  async create(dto: CreateBookDto) {
    try {
      const book = this.bookRepository.create(dto);
      return await this.bookRepository.save(book);
    } catch (error) {
      console.log(error);
      throw new CustomException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        FAILED_ADDED,
        TRY_AGAIN,
      );
    }
  }

  async getAll() {
    const books = await this.bookRepository.find();
    return plainToInstance(BookDto, books, { excludeExtraneousValues: true });
  }
}
