import { CreateEventDto } from './create-event.dto';
declare const UpdateEventDto_base: import("@nestjs/common").Type<Omit<CreateEventDto, "clubId">>;
export declare class UpdateEventDto extends UpdateEventDto_base {
    status: string;
    memberIds: number[];
    name: string;
    location: string;
    description: string;
    startDate: string;
    endDate: string;
    registrationDeadline: string;
}
export {};
