import { Area } from 'src/module/areas/entities/area.entity';
import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
import { VinSlot } from 'src/module/vin-slots/entities/vin-slot.entity';
export declare class Court {
    id: number;
    name: string;
    description: string;
    isAvailable: boolean;
    sportType: SportType;
    area: Area;
    vinSlots: VinSlot[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
