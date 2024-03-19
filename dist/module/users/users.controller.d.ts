import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/filter-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("typeorm").ObjectLiteral>;
    findList(query: UserFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            role: string;
            id: number;
            username: string;
            email: string;
            password: string;
            address: string;
            phone: string;
            dob: Date;
            isActive: boolean;
            refreshToken: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        role: string;
        id: number;
        username: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        dob: Date;
        isActive: boolean;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
}
