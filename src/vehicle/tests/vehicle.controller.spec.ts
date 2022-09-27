import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import CreateVehicleDTO from "../dto/create-vehicle.dto";
import { VehicleController } from "../vehicle.controller";
import VehicleService from "../vehicle.service";

describe('CompanyController', () => {
    let controller;
    let service;

    const mockVehicle = {
        id: 1,
        brand: "Renault",
        model: "Clio Tech Run 1.0 16v 70cv 5p",
        color: "Preto",
        board: "JNS-1537",
        type: "carro"
    };

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

    const mockVehicleService = {
        getAll: jest.fn().mockResolvedValueOnce([mockVehicle]),
        showByBoard: jest.fn().mockResolvedValueOnce(mockVehicle),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn().mockResolvedValueOnce(mockResponse)
    };

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[PassportModule.register({defaultStrategy: 'jwt'})],
            controllers: [VehicleController],
            providers: [
                {
                    provide: VehicleService,
                    useValue: mockVehicleService,
                },
            ]
        }).compile();

        controller = module.get<VehicleController>(VehicleController);
        service = module.get<VehicleService>(VehicleService);
    });


    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllVehicle',() => {
        it('should get all vehicle', async () => {
            const result = await controller.getAll(mockUser as any);

            expect(service.getAll).toHaveBeenCalled();
            expect(result).toEqual([mockVehicle]);
        });
    });

    describe('vehicleByBoard',() => {
        it('should return vehicle by board', async () => {
            const params = 'JNS-1537';
            const result = await controller.showByBoard(params,mockUser as any);

            expect(service.showByBoard).toHaveBeenCalled();
            expect(result).toEqual(mockVehicle);
        });
    });

    describe('create', () => {
        it('should create a vehicle', async () => {
            const newVehicle: CreateVehicleDTO = {
                brand: "Mercury",
                model: "Mystique GS 2.5 V6 Mec.",
                color: "1995",
                board: "IAJ-4818",
                type: "Azul"
            }

            mockVehicleService.create = jest.fn().mockResolvedValueOnce(mockVehicle);

            const result = await controller.create(newVehicle as any, mockUser as any);
            
            expect(service.create).toHaveBeenCalled();
            expect(result).toEqual(mockVehicle);
        });
    });

    describe('updateVehicle', () => {
        it('should update vehicle by board', async () => {
            const vehicle = {...mockVehicle, color: 'branco'};
            const updateVehicle = {color: 'branco'};

            mockVehicleService.update = jest.fn().mockResolvedValueOnce(vehicle);

            const result = await controller.update(vehicle.board, updateVehicle as any, mockUser as any);

            expect(service.update).toHaveBeenCalled();
            expect(result).toEqual(vehicle);
            expect(result.color).toEqual(vehicle.color);
        });
    });

    describe('deleteVehicle', () => {
        it('should delete vehicle by board', async () => {
            const result = await controller.delete(mockVehicle.board, mockUser as any, mockResponse);
            
            expect(service.delete).toHaveBeenCalled();
   
            expect(result).toBe(mockResponse);
        });
    });
});