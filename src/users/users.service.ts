import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findByid(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(user: CreateUserDto) {
    await this.userRepository.insert(user);

    return {
      message: 'User created successfully',
    };
  }

  async update(id: number, update: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...update });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.save(user);

    return {
      message: 'User updated successfully',
    };
  }

  delete(id: number) {
    return this.userRepository.delete({ id });
  }
}
