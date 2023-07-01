import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '../s3/s3.module';
import { ImageController } from './image.controller';
import { Image } from './image.entity';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), S3Module],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
