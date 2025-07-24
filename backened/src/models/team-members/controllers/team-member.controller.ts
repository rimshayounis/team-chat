// src/team-members/team-member.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { TeamMemberService } from '../services/team-member.service';

@Controller('team-members')
export class TeamMemberController {
  constructor(private readonly service: TeamMemberService) {}
@Post('join')
  async joinTeam(@Body() body: { userId: string; teamId: string }) {
    const { userId, teamId } = body;
    return this.service.addMember(userId, teamId);
  }
 

  // Get all members of a team
  @Get(':teamId')
  async getMembers(@Param('teamId') teamId: string) {
    console.log("TeamId", teamId);
    return this.service.findTeamMembers(teamId);
  }

  // Remove a member from a team
  @Delete()
  async removeMember(@Body() dto: { userId: string; teamId: string }) {
    return this.service.removeMember(dto.userId, dto.teamId);
  }

  // Update a member's role in a team
  @Put()
  async updateRole(@Body() dto: { userId: string; teamId: string; role: string }) {
    return this.service.updateRole(dto.userId, dto.teamId, dto.role);
  }
}
