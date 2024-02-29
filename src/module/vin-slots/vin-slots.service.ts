import { Injectable } from '@nestjs/common';
import { CreateVinSlotDto } from './dto/create-vin-slot.dto';
import { UpdateVinSlotDto } from './dto/update-vin-slot.dto';

@Injectable()
export class VinSlotsService {
  create(createVinSlotDto: CreateVinSlotDto) {
    return 'This action adds a new vinSlot';
  }

  findList() {
    return `This action returns all vinSlots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vinSlot`;
  }

  update(id: number, updateVinSlotDto: UpdateVinSlotDto) {
    return `This action updates a #${id} vinSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} vinSlot`;
  }
}
