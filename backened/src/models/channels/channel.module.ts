// channel module 
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './entities/channel.schema';
import { ChannelService } from './services/channel.service';
import { ChannelController } from './controllers/channel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Channel.name, schema: ChannelSchema },
    ]),
  ],
  providers: [ChannelService],
  controllers: [ChannelController],
  exports: [ChannelService],
})
export class ChannelModule {}

