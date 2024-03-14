import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from '../role/roles.module';
import { Member } from '../members/entities/member.entity';
import { Club } from '../clubs/entities/club.entity';
import { Wallet } from '../wallets/entities/wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Member, Club, Wallet]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
