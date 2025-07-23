//message.module

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Message, MessageSchema } from './entities/message.schema';
import { MessageService } from './services/message.service';
import { MessageController } from './controllers/message.controller';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
