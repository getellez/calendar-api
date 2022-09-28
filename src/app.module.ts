import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { preSaveHook } from './users/entities/hooks/presave.hook';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: preSaveHook,
      },
    ]),
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/calendar_db'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
