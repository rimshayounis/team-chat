import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { username,  email, password } = body;
    return this.userService.register( username, email, password );
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    return this.userService.login(email, password);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
