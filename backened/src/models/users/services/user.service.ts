import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register( username: string, email: string, password: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new Error('User already exists');
    }

    const user = new this.userModel({ username, email, password });
    await user.save();
    return { message: 'User registered successfully', user };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) { // In real apps, use bcrypt
      throw new Error('Invalid password');
    }

    return { message: 'Login successful', user };
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }
}
