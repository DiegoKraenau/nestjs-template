import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos';
import { ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';
import { Tracking } from 'src/shared/interceptors';
import { AuthGuard } from 'src/shared/decorators';

@Controller('book')
@UseInterceptors(Tracking)
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Create book' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    schema: {
      example: {
        title: 'Internal Server Error',
        message: 'An unexpected error occurred while creating the book.',
      },
    },
  })
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateBookDto) {
    return await this.bookService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update book' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return { message: `Book with ID ${id} updated`, data: dto };
  }

  @Get()
  @ApiOperation({ summary: 'Get books' })
  async get() {
    return await this.bookService.getAll();
  }
}
