// src/team-member/team-member.controller.ts
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TeamMemberService } from '../services/team-member.service';

@Controller('team-members')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Post('join')
  async joinTeam(@Body() body: { userId: string; teamId: string }) {
    return this.teamMemberService.joinTeam(body.userId, body.teamId);
  }

  @Get('role')
  async getUserRole(@Query('userId') userId: string, @Query('teamId') teamId: string) {
    const role = await this.teamMemberService.getUserRole(userId, teamId);
    return { role };
  }

  @Get('user-teams')
  async getTeamsByUser(@Query('userId') userId: string) {
    return this.teamMemberService.getTeamsByUser(userId);
  }
}
