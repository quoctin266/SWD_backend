import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVinSlotDto } from './dto/create-vin-slot.dto';
import { UpdateVinSlotDto } from './dto/update-vin-slot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VinSlot } from './entities/vin-slot.entity';
import { Repository } from 'typeorm';
import { Member } from '../members/entities/member.entity';
import { Court } from '../courts/entities/court.entity';
import {
  BAD_TIME_INPUT_VINSLOT,
  FAIL_CREATE_VINSLOT,
  NOTFOUND_COURT,
  NOTFOUND_MEMBER,
  NOTFOUND_VINSLOT,
} from 'src/util/message';

@Injectable()
export class VinSlotsService {
  constructor(
    @InjectRepository(VinSlot)
    private vinSlotRepository: Repository<VinSlot>,

    @InjectRepository(Member)
    private memberRepository: Repository<Member>,

    @InjectRepository(Court)
    private courtRepository: Repository<Court>,
  ) {}

  async create(createVinSlotDto: CreateVinSlotDto) {
    if (createVinSlotDto.endAt <= createVinSlotDto.beginAt)
      throw new BadRequestException(BAD_TIME_INPUT_VINSLOT);

    const court: Court = await this.courtRepository.findOne({
      where: { id: createVinSlotDto.courtId },
    });
    if (court) throw new NotFoundException(NOTFOUND_COURT);

    const createdBy: Member = await this.memberRepository.findOne({
      where: { id: createVinSlotDto.createdBy },
    });
    if (createdBy) throw new NotFoundException(NOTFOUND_MEMBER);

    const newVinSlot = this.vinSlotRepository.save({
      ...createVinSlotDto,
      court,
      createdBy,
    });

    if (!newVinSlot) throw new BadRequestException(FAIL_CREATE_VINSLOT);
    return newVinSlot;
  }

  async findList() {
    const vinSlots: VinSlot[] = await this.vinSlotRepository.find();
    if (vinSlots.length == 0) throw new NotFoundException(NOTFOUND_VINSLOT);
    return vinSlots;
  }

  async findOne(id: number) {
    const vinSlot: VinSlot = await this.vinSlotRepository.findOne({
      where: { id },
      relations: ['court', 'createdBy'],
    });
    if (!vinSlot) throw new NotFoundException(NOTFOUND_VINSLOT);
    return vinSlot;
  }

  async update(id: number, updateVinSlotDto: UpdateVinSlotDto) {
    let vinSlot: VinSlot = await this.vinSlotRepository.findOne({
      where: { id },
      relations: ['court', 'createdBy'],
    });
    if (!vinSlot) throw new NotFoundException(NOTFOUND_VINSLOT);
    if (
      (updateVinSlotDto.endAt ?? vinSlot.endAt) <=
      (updateVinSlotDto.beginAt ?? vinSlot.beginAt)
    )
      throw new BadRequestException(BAD_TIME_INPUT_VINSLOT);
    const court: Court = await this.courtRepository.findOne({
      where: { id: updateVinSlotDto.courtId },
    });
    if (court) throw new NotFoundException(NOTFOUND_COURT);
    const updatedVinSlot = await this.vinSlotRepository.save({
      ...vinSlot,
      ...updateVinSlotDto,
      court,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} vinSlot`;
  }
}
