import { IUser } from 'src/module/users/dto/users.dto';
export declare class LoginResponse {
    accessToken: string;
    resfreshToken: string;
    user: IUser;
}
export declare class SuccessResponse {
    statusCode: number;
    message: string;
    data: LoginResponse;
}
