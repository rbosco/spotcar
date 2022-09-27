import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import CreateParkDTO from "../dto/create-park.dto";
import { ParkController } from "../park.controller";
import ParkService from "../park.service";

describe('ParkController', () => {
    let controller;
    let service;

    const mockPark = {
        v_id: 12,
        v_vehicleId: 5,
        v_companyId: 1,
        v_created_at: '2022-09-26T00:39:44.687Z',
        v_updated_at: null,
        v_deleted_at: null
    }

    const mockVehiclePark = {
        "board": "teste",
        "companyId": 1
    }

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

    const mockParkService = {
        registerIn: jest.fn(),
        registerOut: jest.fn(),
        delete: jest.fn().mockResolvedValueOnce(mockResponse),
    };

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[PassportModule.register({defaultStrategy: 'jwt'})],
            controllers: [ParkController],
            providers: [
                {
                    provide: ParkService,
                    useValue: mockParkService,
                },
            ]
        }).compile();

        controller = module.get<ParkController>(ParkController);
        service = module.get<ParkService>(ParkService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a park', async () => {
            const newPark: CreateParkDTO = {
                "board": "teste",
                "companyId": 1
            }

            mockParkService.registerIn = jest.fn().mockResolvedValueOnce(mockPark);

            const result = await controller.registerIn(newPark as any, mockUser as any);
            
            expect(service.registerIn).toHaveBeenCalled();
            expect(result).toEqual(mockPark);
        });
    });

    describe('updatePark', () => {
        it('should update park', async () => {
            const park = {...mockPark, updated_at: new Date()};
            const updatePark = {updated_at: new Date()};

            mockParkService.registerOut = jest.fn().mockResolvedValueOnce(park);

            const result = await controller.registerOut(park.updated_at, updatePark as any, mockUser as any);

            expect(service.registerOut).toHaveBeenCalled();
            expect(result).toEqual(park);
            expect(result.updated_at).toEqual(park.updated_at);
        });
    });

    describe('deletePark', () => {
        it('should delete park', async () => {
            const park = {...mockVehiclePark};

            const result = await controller.delete(park, mockUser as any, mockResponse);
            
            expect(service.delete).toHaveBeenCalled();
   
            expect(result).toBe(mockResponse);
        });
    });
});