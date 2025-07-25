

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './entities/team.schema';
import { TeamService } from './services/team.service';
import { TeamController } from './controllers/team.controller';
import { TeamMemberModule } from '../team-members/team-member.module'; // ✅ Import it

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]),
    TeamMemberModule, // ✅ Use it here
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}

