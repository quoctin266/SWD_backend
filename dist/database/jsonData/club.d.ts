import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
interface IClub {
    name: string;
    email: string;
    description: string;
    sportType?: SportType;
}
export declare const footballClubData: IClub[];
export declare const basketballClubData: IClub[];
export declare const badmintonClubData: IClub[];
export declare const tennisClubData: IClub[];
export declare const volleyballClubData: IClub[];
export {};
