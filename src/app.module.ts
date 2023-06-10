import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `envs/${process.env.NODE_ENV}.env`, // load from file if exists
    }),
    DatabaseModule.forRootAsync(),
    ImageModule,
  ],
})
export class AppModule {}
