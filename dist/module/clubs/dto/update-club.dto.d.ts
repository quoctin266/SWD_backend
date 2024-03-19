import { CreateClubDto } from './create-club.dto';
declare const UpdateClubDto_base: import("@nestjs/common").Type<Omit<CreateClubDto, "email" | "sportTypeId">>;
export declare class UpdateClubDto extends UpdateClubDto_base {
    isActive: boolean;
}
export {};
