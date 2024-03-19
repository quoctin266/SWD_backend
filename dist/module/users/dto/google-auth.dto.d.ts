import { CreateUserDto } from './create-user.dto';
declare const GoogleAuthDto_base: import("@nestjs/common").Type<Omit<CreateUserDto, "password" | "address" | "phone" | "dob" | "roleId">>;
export declare class GoogleAuthDto extends GoogleAuthDto_base {
}
export {};
