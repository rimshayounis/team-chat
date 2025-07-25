// src/team/team.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from '../entities/team.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeamService {
  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {}

  private readonly ADMIN_ID = '6881f88f559b4c3e91663c58';

  async create(name: string, creatorId: string): Promise<Team> {
    if (creatorId !== this.ADMIN_ID) {
      throw new ForbiddenException('Only admin/owner can create a team');
    }
    return this.teamModel.create({ name });
  }

  async delete(teamId: string, userId: string): Promise<void> {
    if (userId !== this.ADMIN_ID) {
      throw new ForbiddenException('Only admin/owner can delete a team');
    }
    await this.teamModel.findByIdAndDelete(teamId);
  }

  async findAll(): Promise<Team[]> {
    return this.teamModel.find();
  }
}
