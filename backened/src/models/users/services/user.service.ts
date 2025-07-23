
  
// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('User not found');
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}

