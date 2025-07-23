import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from '../entities/team.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
  ) {}

  async createTeam(name: string): Promise<Team> {
    const team = new this.teamModel({ name });
    return await team.save();
  }

  async getAllTeams(): Promise<Team[]> {
    return this.teamModel.find().exec();
  }

  async getTeamById(id: string): Promise<Team> {
    const team = await this.teamModel.findById(id).exec();
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async updateTeam(id: string, name: string): Promise<Team> {
    const team = await this.teamModel.findByIdAndUpdate(id, { name }, { new: true }).exec();
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async deleteTeam(id: string): Promise<void> {
    const result = await this.teamModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Team not found');
  }
}
