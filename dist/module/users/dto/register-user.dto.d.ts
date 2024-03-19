import { CreateUserDto } from './create-user.dto';
declare const RegisterUserDto_base: import("@nestjs/common").Type<Omit<CreateUserDto, "address" | "phone" | "dob" | "roleId">>;
export declare class RegisterUserDto extends RegisterUserDto_base {
}
export {};
