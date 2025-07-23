import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './models/users/user.module';
import { TeamModule } from './models/teams/team.module';
import { TeamMemberModule } from './models/team-members/team-member.module';
import { ChannelModule } from './models/channels/channel.module';
import { MessageModule } from './models/messages/message.module';
import { MessageGateway } from './models/messages/message.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chat-app'),
    
    // Feature Modules
    UserModule,
    TeamModule,
    TeamMemberModule,
    ChannelModule,
    MessageModule,
  ],
  providers: [MessageGateway], // WebSocket Gateway
})
export class AppModule {}

