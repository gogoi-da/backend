import { Injectable } from '@nestjs/common';
import { version } from '../package.json';
import { RootResponseDto } from './app.controller';
@Injectable()
export class AppService {
  /**
   * Returns a message and version for the root endpoint.
   */
  getHello(): Pick<RootResponseDto, 'message'> {
    return {
      message: `🚀 Booking APIs are up and running on v${version}! Ready to serve your requests!`,
    };
  }
}