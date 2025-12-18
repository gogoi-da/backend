import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  app.enableShutdownHooks();
  const port = parseInt(process.env.PORT ?? '5001', 10);
  await app.listen(port);

  // Log startup info
  const env = process.env.ENVIRONMENT ?? 'development';
  console.log(`🚀 Khati API started on port ${port} [ ${env} ]`);
}
bootstrap().catch((err) => {
  console.error('Failed to start application: ', err);
  process.exit(1);
});
