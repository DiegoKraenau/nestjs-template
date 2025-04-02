import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos';
import { ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';
import { Tracking } from 'src/shared/decorators';

@Controller('user')
@UseInterceptors(Tracking)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    schema: {
      example: {
        title: 'Internal Server Error',
        message: 'An unexpected error occurred while creating the user.',
      },
    },
  })
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  async updateUser(@Param('id') id: string, @Body() dto: any) {
    return { message: `User with ID ${id} updated`, data: dto };
  }
}
