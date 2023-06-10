import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class DatabaseModule {
  static forRootAsync(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE'),
        entities: ['<rootDir>/src/modules/**/*.entity.ts'],
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    });
  }
}
