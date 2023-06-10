import { Controller, Get } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './image.entity';

@Controller('images')
export class ImageController {
  constructor(private readonly imageSerive: ImageService) {}

  @Get()
  findAll(): Promise<Image[]> {
    return this.imageSerive.findAll();
  }
}
