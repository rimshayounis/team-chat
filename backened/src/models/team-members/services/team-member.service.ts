// src/team-members/team-member.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamMember, TeamMemberDocument } from '../entities/team-member.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectModel(TeamMember.name)
    private readonly model: Model<TeamMemberDocument>,
  ) {}

  // ✅ Add member to a team only if not already a member
  async addMember(userId: string, teamId: string, role: string = 'Member') {
    const userObjectId = new Types.ObjectId(userId);
    const teamObjectId = new Types.ObjectId(teamId);

    const exists = await this.model.findOne({ userId: userObjectId, teamId: teamObjectId });
    if (exists) {
      throw new Error('User already joined this team');
    }

    return this.model.create({ userId: userObjectId, teamId: teamObjectId, role });
  }

  // ✅ Get all members of a team
  async findTeamMembers(teamId: string) {
    const teamObjectId = new Types.ObjectId(teamId);
    return this.model
      .find({ teamId: teamObjectId })
      .populate('userId')
      .populate('teamId')
      .exec();
  }

  // ✅ Remove a team member
  async removeMember(userId: string, teamId: string) {
    return this.model.deleteOne({
      userId: new Types.ObjectId(userId),
      teamId: new Types.ObjectId(teamId),
    });
  }

  // ✅ Update role of a team member
  async updateRole(userId: string, teamId: string, role: string) {
    return this.model.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        teamId: new Types.ObjectId(teamId),
      },
      { role },
      { new: true },
    );
  }
}
