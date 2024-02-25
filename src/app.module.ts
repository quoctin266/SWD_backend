import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './database/datasource.config';
import { RolesModule } from './module/role/roles.module';
import { PermissionsModule } from './module/permissions/permissions.module';
import { AreasModule } from './module/areas/areas.module';
import { SportTypesModule } from './module/sport-types/sport-types.module';
import { CourtsModule } from './module/courts/courts.module';
import { VinSlotsModule } from './module/vin-slots/vin-slots.module';
import { ClubsModule } from './module/clubs/clubs.module';
import { MembersModule } from './module/members/members.module';
import { EventsModule } from './module/events/events.module';
import { PostsModule } from './module/posts/posts.module';
import { CommentsModule } from './module/comments/comments.module';
import { ApplicationsModule } from './module/applications/applications.module';
import { WalletsModule } from './module/wallets/wallets.module';
import { TransactionsModule } from './module/transactions/transactions.module';
import { AuthModule } from './module/auth/auth.module';
import { DatabasesModule } from './database/database.module';
import { FilesModule } from './module/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.production.env',
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    RolesModule,
    PermissionsModule,
    AreasModule,
    SportTypesModule,
    CourtsModule,
    VinSlotsModule,
    ClubsModule,
    MembersModule,
    EventsModule,
    PostsModule,
    CommentsModule,
    ApplicationsModule,
    WalletsModule,
    TransactionsModule,
    AuthModule,
    DatabasesModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
