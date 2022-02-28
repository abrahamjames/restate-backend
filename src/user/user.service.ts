import { User } from './entities/user.entity';
import { UserResponse } from './res/users.response';
import { UserRepository } from './user.repo';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(
    page?: number,
    size?: number,
    search?: string,
  ): Promise<UserResponse> {
    const users = await this.userRepo.findUsers(page, size, search);
    return {
      page: page,
      size: size,
      total: users.length,
      data: users,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
