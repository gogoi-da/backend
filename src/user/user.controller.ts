import { Controller, Get, Put, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from 'src/guard';
import { GetUser } from 'src/decorator/getUser.decorator';
import { UserService } from './user.service';
import { GetProfileDocs, SetExamIdDocs, UserDocs } from './docs';
import { SetExamIdDto } from './dto';

@Controller('user')
@UseGuards(JwtGuard)
@UserDocs.Controller
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @GetProfileDocs
  async getUserDetails(@GetUser('id') userId: string) {
    return this.userService.getUserDetails(userId);
  }

  @Put('exam-id')
  @SetExamIdDocs
  async setExamId(
    @GetUser('id') userId: string,
    @Body() dto: SetExamIdDto,
  ) {
    return this.userService.setExamId(userId, dto.examId);
  }
}
