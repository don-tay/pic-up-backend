import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImageRepository } from './image.repository';

export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: ImageRepository,
  ) {}

  findAll() {
    return this.imageRepository.find();
  }
}
