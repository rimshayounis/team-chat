
//message.controller

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessageService } from '../services/message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post()
  send(@Body() dto: { channelId: string; senderId: string; content: string }) {
    return this.service.sendMessage(dto.channelId, dto.senderId, dto.content);
  }

  @Get(':channelId')
  getChannelMessages(@Param('channelId') channelId: string) {
    return this.service.getMessages(channelId);
  }
}
