import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JobDocs, CreateJobDocs, GetJobsDocs, GetJobDocs, BookmarkJobDocs, GetBookmarkedJobsDocs } from './docs';
import { CreateJobDto, GetJobsDto, GetBookmarkedJobsDto } from './dto';
import { JwtGuard } from 'src/guard';
import { GetUser } from 'src/decorator/getUser.decorator';

@Controller('jobs')
@UseGuards(JwtGuard)
@JobDocs.Controller
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  @GetJobsDocs
  getJobs(@Query() dto: GetJobsDto, @GetUser() user: { id: string }) {
    return this.jobService.getJobs(dto, user.id);
  }

  @Get('bookmarked')
  @GetBookmarkedJobsDocs
  getBookmarkedJobs(
    @Query() dto: GetBookmarkedJobsDto,
    @GetUser() user: { id: string },
  ) {
    return this.jobService.getBookmarkedJobs(dto, user.id);
  }

  @Get(':id')
  @GetJobDocs
  getJob(@Param('id') id: string, @GetUser() user: { id: string }) {
    return this.jobService.getJob(id, user.id);
  }

  @Post()
  @CreateJobDocs
  createJob(@Body() dto: CreateJobDto) {
    return this.jobService.createJob(dto);
  }

  @Patch(':id/bookmark')
  @BookmarkJobDocs
  toggleBookmarkJob(
    @Param('id') id: string,
    @GetUser() user: { id: string },
  ) {
    return this.jobService.toggleBookmarkJob(id, user.id);
  }
}
