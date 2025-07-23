import { Controller, Post, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { TeamService } from '../services/team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  createTeam(@Body() createTeamDto: { name: string }) {
    return this.teamService.createTeam(createTeamDto.name);
  }

  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }

  @Get(':id')
  getTeamById(@Param('id') id: string) {
    return this.teamService.getTeamById(id);
  }

  @Put(':id')
  updateTeam(@Param('id') id: string, @Body() updateTeamDto: { name: string }) {
    return this.teamService.updateTeam(id, updateTeamDto.name);
  }

  @Delete(':id')
  deleteTeam(@Param('id') id: string) {
    return this.teamService.deleteTeam(id);
  }
}
