import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SwaggerService } from './shared/services/swagger.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT, 10),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [__dirname + './**/**/*entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
          timezone: 'UTC',
        };
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [SwaggerService],
})
export class AppModule {}
