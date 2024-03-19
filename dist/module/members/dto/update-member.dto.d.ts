import { CreateMemberDto } from './create-member.dto';
declare const UpdateMemberDto_base: import("@nestjs/common").Type<Omit<CreateMemberDto, "clubId" | "userId">>;
export declare class UpdateMemberDto extends UpdateMemberDto_base {
    isLeader: boolean;
}
export {};
