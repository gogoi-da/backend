import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import {
  TestDocs,
  CreateTestSeriesDocs,
  GetTestSeriesDocs,
  GetTestSeriesListDocs,
  UpdateTestSeriesDocs,
  DeleteTestSeriesDocs,
  CreateTestDocs,
  GetTestDocs,
  GetTestsByTestSeriesDocs,
  UpdateTestDocs,
  DeleteTestDocs,
  CreateTestQuestionDocs,
  GetTestQuestionDocs,
  GetTestQuestionsListDocs,
  UpdateTestQuestionDocs,
  DeleteTestQuestionDocs,
  LikeTestSeriesDocs,
} from './docs';
import {
  CreateTestSeriesDto,
  UpdateTestSeriesDto,
  GetTestSeriesDto,
  CreateTestDto,
  UpdateTestDto,
  CreateTestQuestionDto,
  UpdateTestQuestionDto,
  GetTestQuestionsDto,
} from './dto';
import { JwtGuard } from 'src/guard';
import { GetUser } from 'src/decorator/getUser.decorator';

@Controller('test-series')
@UseGuards(JwtGuard)
@TestDocs.Controller
export class TestController {
  constructor(private testService: TestService) {}

  // Test Series endpoints
  @Post()
  @CreateTestSeriesDocs
  createTestSeries(@Body() dto: CreateTestSeriesDto) {
    return this.testService.createTestSeries(dto);
  }

  @Get()
  @GetTestSeriesListDocs
  getTestSeriesList(
    @Query() dto: GetTestSeriesDto,
    @GetUser() user: { id: string },
  ) {
    return this.testService.getTestSeriesList(dto, user.id);
  }

  // Test endpoints - must come before parameterized routes
  @Post('tests')
  @CreateTestDocs
  createTest(@Body() dto: CreateTestDto) {
    return this.testService.createTest(dto);
  }

  @Get('tests/:id')
  @GetTestDocs
  getTest(@Param('id') id: string) {
    return this.testService.getTest(id);
  }

  @Put('tests/:id')
  @UpdateTestDocs
  updateTest(@Param('id') id: string, @Body() dto: UpdateTestDto) {
    return this.testService.updateTest(id, dto);
  }

  @Delete('tests/:id')
  @DeleteTestDocs
  deleteTest(@Param('id') id: string) {
    return this.testService.deleteTest(id);
  }

  // Test Question endpoints - must come before parameterized routes
  @Get('tests/:id/questions')
  @GetTestQuestionsListDocs
  getTestQuestionsList(
    @Param('id') id: string,
    @Query() dto: GetTestQuestionsDto,
  ) {
    return this.testService.getTestQuestionsList(id, dto);
  }

  @Post('tests/questions')
  @CreateTestQuestionDocs
  createTestQuestion(@Body() dto: CreateTestQuestionDto) {
    return this.testService.createTestQuestion(dto);
  }

  @Get('tests/questions/:id')
  @GetTestQuestionDocs
  getTestQuestion(@Param('id') id: string) {
    return this.testService.getTestQuestion(id);
  }

  @Put('tests/questions/:id')
  @UpdateTestQuestionDocs
  updateTestQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateTestQuestionDto,
  ) {
    return this.testService.updateTestQuestion(id, dto);
  }

  @Delete('tests/questions/:id')
  @DeleteTestQuestionDocs
  deleteTestQuestion(@Param('id') id: string) {
    return this.testService.deleteTestQuestion(id);
  }

  // Get all tests under a test series
  @Get(':id/tests')
  @GetTestsByTestSeriesDocs
  getTestsList(@Param('id') id: string) {
    return this.testService.getTestsList(id);
  }

  // Like test series endpoint - must come before parameterized routes
  @Patch(':id/like')
  @LikeTestSeriesDocs
  toggleLikeTestSeries(
    @Param('id') id: string,
    @GetUser() user: { id: string },
  ) {
    return this.testService.toggleLikeTestSeries(id, user.id);
  }

  // Test Series parameterized routes - must come after specific routes
  @Get(':id')
  @GetTestSeriesDocs
  getTestSeries(@Param('id') id: string) {
    return this.testService.getTestSeries(id);
  }

  @Put(':id')
  @UpdateTestSeriesDocs
  updateTestSeries(@Param('id') id: string, @Body() dto: UpdateTestSeriesDto) {
    return this.testService.updateTestSeries(id, dto);
  }

  @Delete(':id')
  @DeleteTestSeriesDocs
  deleteTestSeries(@Param('id') id: string) {
    return this.testService.deleteTestSeries(id);
  }
}
