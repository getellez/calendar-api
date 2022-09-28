import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const orCondition = {
      $or: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    };
    const existingUser = await this.userModel.findOne(orCondition);
    if (existingUser) {
      throw new BadRequestException(`username or email is already in use`);
    }
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`The user with id "${id}" was not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(id);
    await this.userModel.updateOne({ _id: id }, updateUserDto);
    return { ...existingUser.toJSON(), ...updateUserDto };
  }

  async remove(id: string) {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`User with id "${id}" was not found`);
    }
  }
}
