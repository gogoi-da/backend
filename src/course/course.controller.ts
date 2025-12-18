import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CourseService } from './course.service';
import {
  CourseDocs,
  CreateExamDocs,
  GetExamDocs,
  GetExamsDocs,
  UpdateExamDocs,
  DeleteExamDocs,
  CreateSubjectDocs,
  GetSubjectDocs,
  GetSubjectsDocs,
  UpdateSubjectDocs,
  DeleteSubjectDocs,
  CreateLessonDocs,
  GetLessonDocs,
  GetLessonsDocs,
  UpdateLessonDocs,
  DeleteLessonDocs,
  CreateQuestionDocs,
  GetQuestionDocs,
  GetQuestionsDocs,
  UpdateQuestionDocs,
  DeleteQuestionDocs,
  CreateNotificationDocs,
  GetNotificationDocs,
  GetNotificationsDocs,
  UpdateNotificationDocs,
  DeleteNotificationDocs,
  GetExamDetailsDocs,
  LikeExamDocs,
  GetLessonsBySubjectDocs,
  GetQuestionsByLessonDocs,
  BookmarkQuestionDocs,
} from './docs';
import {
  CreateExamDto,
  UpdateExamDto,
  GetExamsDto,
  CreateSubjectDto,
  UpdateSubjectDto,
  GetSubjectsDto,
  CreateLessonDto,
  UpdateLessonDto,
  GetLessonsDto,
  CreateQuestionDto,
  UpdateQuestionDto,
  GetQuestionsDto,
  GetQuestionsByLessonDto,
  CreateNotificationDto,
  UpdateNotificationDto,
  GetNotificationsDto,
} from './dto';
import { JwtGuard } from 'src/guard';
import { GetUser } from 'src/decorator/getUser.decorator';

@Controller('exams')
@UseGuards(JwtGuard)
@CourseDocs.Controller
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  @CreateExamDocs
  createExam(@Body() dto: CreateExamDto) {
    return this.courseService.createExam(dto);
  }

  @Get()
  @GetExamsDocs
  getExams(@Query() dto: GetExamsDto) {
    return this.courseService.getExams(dto);
  }

  @Get('details/:id')
  @GetExamDetailsDocs
  getExamDetails(
    @Param('id') id: string,
    @GetUser() user: { id: string },
  ) {
    return this.courseService.getExamDetails(id, user.id);
  }

  @Patch(':id/like')
  @LikeExamDocs
  toggleLikeExam(
    @Param('id') id: string,
    @GetUser() user: { id: string },
  ) {
    return this.courseService.toggleLikeExam(id, user.id);
  }

  @Get(':id')
  @GetExamDocs
  getExam(@Param('id') id: string) {
    return this.courseService.getExam(id);
  }

  @Put(':id')
  @UpdateExamDocs
  updateExam(@Param('id') id: string, @Body() dto: UpdateExamDto) {
    return this.courseService.updateExam(id, dto);
  }

  @Delete(':id')
  @DeleteExamDocs
  deleteExam(@Param('id') id: string) {
    return this.courseService.deleteExam(id);
  }

  // Subject endpoints
  @Post('subjects')
  @CreateSubjectDocs
  createSubject(@Body() dto: CreateSubjectDto) {
    return this.courseService.createSubject(dto);
  }

  @Get('subjects')
  @GetSubjectsDocs
  getSubjects(@Query() dto: GetSubjectsDto) {
    return this.courseService.getSubjects(dto);
  }

  @Get('subjects/:subjectId/lessons')
  @GetLessonsBySubjectDocs
  getLessonsBySubject(@Param('subjectId') subjectId: string) {
    return this.courseService.getLessonsBySubject(subjectId);
  }

  @Get('subjects/:id')
  @GetSubjectDocs
  getSubject(@Param('id') id: string) {
    return this.courseService.getSubject(id);
  }

  @Put('subjects/:id')
  @UpdateSubjectDocs
  updateSubject(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return this.courseService.updateSubject(id, dto);
  }

  @Delete('subjects/:id')
  @DeleteSubjectDocs
  deleteSubject(@Param('id') id: string) {
    return this.courseService.deleteSubject(id);
  }

  // Lesson endpoints
  @Post('lessons')
  @CreateLessonDocs
  createLesson(@Body() dto: CreateLessonDto) {
    return this.courseService.createLesson(dto);
  }

  @Get('lessons')
  @GetLessonsDocs
  getLessons(@Query() dto: GetLessonsDto) {
    return this.courseService.getLessons(dto);
  }

  @Get('lessons/:lessonId/questions')
  @GetQuestionsByLessonDocs
  getQuestionsByLesson(
    @Param('lessonId') lessonId: string,
    @GetUser() user: { id: string },
    @Query() dto: GetQuestionsByLessonDto,
  ) {
    return this.courseService.getQuestionsByLesson(lessonId, user.id, dto);
  }

  @Get('lessons/:id')
  @GetLessonDocs
  getLesson(@Param('id') id: string) {
    return this.courseService.getLesson(id);
  }

  @Put('lessons/:id')
  @UpdateLessonDocs
  updateLesson(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.courseService.updateLesson(id, dto);
  }

  @Delete('lessons/:id')
  @DeleteLessonDocs
  deleteLesson(@Param('id') id: string) {
    return this.courseService.deleteLesson(id);
  }

  // Question endpoints
  @Post('questions')
  @CreateQuestionDocs
  createQuestion(@Body() dto: CreateQuestionDto) {
    return this.courseService.createQuestion(dto);
  }

  @Get('questions')
  @GetQuestionsDocs
  getQuestions(@Query() dto: GetQuestionsDto) {
    return this.courseService.getQuestions(dto);
  }

  @Get('questions/:id')
  @GetQuestionDocs
  getQuestion(@Param('id') id: string) {
    return this.courseService.getQuestion(id);
  }

  @Put('questions/:id')
  @UpdateQuestionDocs
  updateQuestion(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.courseService.updateQuestion(id, dto);
  }

  @Delete('questions/:id')
  @DeleteQuestionDocs
  deleteQuestion(@Param('id') id: string) {
    return this.courseService.deleteQuestion(id);
  }

  @Patch('questions/:id/bookmark')
  @BookmarkQuestionDocs
  toggleBookmarkQuestion(
    @Param('id') id: string,
    @GetUser() user: { id: string },
  ) {
    return this.courseService.toggleBookmarkQuestion(id, user.id);
  }

  // Notification endpoints
  @Post('notifications')
  @CreateNotificationDocs
  createNotification(@Body() dto: CreateNotificationDto) {
    return this.courseService.createNotification(dto);
  }

  @Get('notifications')
  @GetNotificationsDocs
  getNotifications(@Query() dto: GetNotificationsDto) {
    return this.courseService.getNotifications(dto);
  }

  @Get('notifications/:id')
  @GetNotificationDocs
  getNotification(@Param('id') id: string) {
    return this.courseService.getNotification(id);
  }

  @Put('notifications/:id')
  @UpdateNotificationDocs
  updateNotification(
    @Param('id') id: string,
    @Body() dto: UpdateNotificationDto,
  ) {
    return this.courseService.updateNotification(id, dto);
  }

  @Delete('notifications/:id')
  @DeleteNotificationDocs
  deleteNotification(@Param('id') id: string) {
    return this.courseService.deleteNotification(id);
  }
}

