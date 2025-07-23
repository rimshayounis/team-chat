import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ChannelService } from '../services/channel.service';

@Controller('channels')
export class ChannelController {
  constructor(private readonly service: ChannelService) {}

  @Post()
  async create(@Body() dto: { name: string; teamId: string }) {
    return this.service.create(dto.name, dto.teamId);
  }

  @Get(':teamId')
  async getChannels(@Param('teamId') teamId: string) {
    return this.service.findByTeam(teamId);
  }

  @Delete(':channelId')
  async delete(@Param('channelId') channelId: string) {
    return this.service.deleteChannel(channelId);
  }
}
