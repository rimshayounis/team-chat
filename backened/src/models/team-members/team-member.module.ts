import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMember, TeamMemberSchema } from './entities/team-member.schema';
import { TeamMemberService } from './services/team-member.service';
import { TeamMemberController } from './controllers/team-member.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TeamMember', schema: TeamMemberSchema }]),
  ],
  controllers: [TeamMemberController],
  providers: [TeamMemberService],
  exports: [MongooseModule] // ✅ Export the model for use in other modules
})
export class TeamMemberModule {}

