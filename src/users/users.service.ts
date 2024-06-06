import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.usersRepository.delete(id);

    if (deleted) {
      return true;
    }
  }
}
