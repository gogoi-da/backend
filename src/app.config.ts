import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import { version } from '../package.json';

/**
 * Configures the NestJS application with CORS, Swagger documentation.
 *
 * - CORS origins and credentials are set from environment variables.
 * - Swagger docs are protected with basic auth (credentials from env vars).
 * - Swagger is only enabled outside production.
 *
 * @param app The NestJS application instance
 */
export function configureApp(app: INestApplication) {
  // Configure validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have decorators
      transform: true, // Automatically transform payloads to DTO instances
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted values are provided
    })
  );

  // Configure CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Protect Swagger docs with basic auth (credentials from env)
  const swaggerUser = process.env.SWAGGER_USER ?? 'admin@khati';
  const swaggerPass = process.env.SWAGGER_PASS ?? 'zaq1xsw2';
  if (!swaggerUser || !swaggerPass) {
    // Optionally log a warning if using default credentials
    console.warn(
      'Swagger docs are protected with basic auth (credentials from env vars)',
    );
  }
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: { [swaggerUser]: swaggerPass },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Khati API')
    .setDescription('The Khati API documentation')
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  if (process.env.ENVIRONMENT !== 'production') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      customSiteTitle: 'Khati API Docs',
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}