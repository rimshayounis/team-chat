import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(username: string, email: string, password: string) {
    // ✅ Validate password is a string
    if (typeof password !== 'string') {
      throw new BadRequestException('Password must be a string');
    }

    // ✅ Validate password length
    if (password.length < 7) {
      throw new BadRequestException('Password must be at least 7 characters long');
    }

    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    const user = new this.userModel({ username, email, password });
    await user.save();
    return { message: 'User registered successfully', user };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.password !== password) {
      throw new BadRequestException('Invalid password');
    }

    return { message: 'Login successful', user };
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }
}
