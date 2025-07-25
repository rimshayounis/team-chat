// src/team-member/team-member.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '../entities/team-member.schema';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectModel(TeamMember.name)
    private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async joinTeam(userId: string, teamId: string): Promise<TeamMember> {
    const existing = await this.teamMemberModel.findOne({ userId, teamId });
    if (existing) return existing;

    return this.teamMemberModel.create({
      userId,
      teamId,
      role: 'Member',
    });
  }

  async getUserRole(userId: string, teamId: string): Promise<string | null> {
    const member = await this.teamMemberModel.findOne({ userId, teamId });
    return member?.role || null;
  }

  async getTeamsByUser(userId: string): Promise<TeamMember[]> {
    return this.teamMemberModel.find({ userId }).populate('teamId');
  }
}
