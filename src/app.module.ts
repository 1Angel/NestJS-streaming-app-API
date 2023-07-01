import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { CourseCommmentsModule } from './course-commments/course-commments.module';
import { VideosModule } from './videos/videos.module';
import { VideosCommentsModule } from './videos-comments/videos-comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoursesModule,
    AuthModule,
    CourseCommmentsModule,
    VideosModule,
    VideosCommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
