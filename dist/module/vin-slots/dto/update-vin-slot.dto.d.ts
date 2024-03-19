import { CreateVinSlotDto } from './create-vin-slot.dto';
declare const UpdateVinSlotDto_base: import("@nestjs/common").Type<Omit<CreateVinSlotDto, "memberId">>;
export declare class UpdateVinSlotDto extends UpdateVinSlotDto_base {
    status: string;
}
export {};
