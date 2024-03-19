import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
export declare class Club {
    id: number;
    name: string;
    email: string;
    description: string;
    isActive: boolean;
    isCommon: boolean;
    sportType: SportType;
    createdAt: Date;
    updatedAt: Date;
}
