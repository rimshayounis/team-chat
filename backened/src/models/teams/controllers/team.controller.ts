// src/team/team.controller.ts
import { Controller, Post, Body, Get, Delete, Query, HttpCode } from '@nestjs/common';
import { TeamService } from '../services/team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() body: { name: string; userId: string }) {
    return this.teamService.create(body.name, body.userId);
  }

  @Delete()
  @HttpCode(200)
  async delete(@Query('teamId') teamId: string, @Query('userId') userId: string) {
    await this.teamService.delete(teamId, userId);
    return { message: 'Team deleted successfully' };
  }

  @Get()
  async findAll() {
    return this.teamService.findAll();
  }
}
