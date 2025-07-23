import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMember, TeamMemberSchema } from './entities/team-member.schema';
import { TeamMemberService } from './services/team-member.service';
import { TeamMemberController } from './controllers/team-member.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  providers: [TeamMemberService],
  controllers: [TeamMemberController],
  exports: [TeamMemberService],
})
export class TeamMemberModule {}
