import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Member } from '../members/entities/member.entity';
import { Club } from '../clubs/entities/club.entity';
import { User } from '../users/entities/user.entity';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, Member, Club, User, VinSlot]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
