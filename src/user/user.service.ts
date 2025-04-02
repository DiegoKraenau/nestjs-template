import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'src/shared/decorators/transactional.decorator';
import { CreateUserDto } from './dtos';
import { CustomException } from 'src/domain/custom-exception';
import { FAILED_ADDED, TRY_AGAIN } from 'src/domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Transactional()
  async createUser(dto: CreateUserDto) {
    try {
      const usuario = this.userRepository.create(dto);
      return await this.userRepository.save(usuario);
    } catch (error) {
      console.log(error);
      throw new CustomException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        FAILED_ADDED,
        TRY_AGAIN,
      );
    }
  }
}
