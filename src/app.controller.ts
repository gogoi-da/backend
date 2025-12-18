import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { version } from '../package.json';

export class RootResponseDto {
  message: string;
  version: string;
  uptime: number;
}

/**
 * Root controller for the Booking API.
 *
 * Provides a simple health/version endpoint at '/'.
 */
@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Khati Service Version and Health'})
  async getHello(): Promise<RootResponseDto> {
    return {
      ...this.appService.getHello(),
      version: version,
      uptime: process.uptime(),
    };
  }
}
