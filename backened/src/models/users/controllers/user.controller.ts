import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: any) {
    return this.userService.createUser(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
