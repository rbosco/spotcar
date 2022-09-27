import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import CreateUserDto from "../dto/createUser.dto";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";


describe('UserController', () => {
    let controller;
    let service;

    const mockUser = {
        id: 3,
        email: "marcosnicolaslopes@panevale.com.br",
        name: "Marcos Nicolas Gustavo Lopes",
        password: "$2a$06$ngFvunevLT59wekbHimhIO4dmHVLsuDQ2yErNJItGQYew3qGsS6sC",
        created_at: "2022-09-25T17:41:51.158Z",
        updated_at: "2022-09-25T17:41:51.158Z",
        deleted_at: null
    }

    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

    const mockUserService = {
        getAll: jest.fn().mockResolvedValueOnce([mockUser]),
        getByEmail: jest.fn().mockResolvedValueOnce(mockUser),
        getById: jest.fn().mockResolvedValueOnce(mockUser),
        update: jest.fn(),
        delete: jest.fn().mockResolvedValueOnce(mockResponse)
    };

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[PassportModule.register({defaultStrategy: 'jwt'})],
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ]
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllUsers',() => {
        it('should show all users', async () => {
            const result = await controller.getAll(mockUser as any);

            expect(service.getAll).toHaveBeenCalled();
            expect(result).toEqual([mockUser]);
        });
    });

    describe('showByEmail',() => {
        it('should return user by email', async () => {
            const params = 'marcosnicolaslopes@panevale.com.br';
            const result = await controller.showByEmail(params,mockUser as any);

            expect(service.getByEmail).toHaveBeenCalled();
            expect(result).toEqual(mockUser);
        });
    });

    describe('updateUser', () => {
        it('should update user', async () => {
            const user = {...mockUser, name: 'Joao'};
            const updateUser = {name: 'Joao'};

            mockUserService.update = jest.fn().mockResolvedValueOnce(user);

            const result = await controller.update(user.name, updateUser as any, mockUser as any);

            expect(service.update).toHaveBeenCalled();
            expect(result).toEqual(user);
            expect(result.name).toEqual(user.name);
        });
    });

    describe('deleteUser', () => {
        it('should delete user by email', async () => {
            const result = await controller.delete(mockUser.email, mockUser as any, mockResponse);
            
            expect(service.delete).toHaveBeenCalled();
   
            expect(result).toBe(mockResponse);
        });
    });
});