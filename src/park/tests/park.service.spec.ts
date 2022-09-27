import { Test, TestingModule } from "@nestjs/testing";
import CompanyService from "../../company/company.service";
import VehicleService from "../../vehicle/vehicle.service";
import { ParkRepository } from "../park.repository";
import ParkService from "../park.service";

describe('ParkService', () => {
    let service;
    let repository;

    const mockPark = {
        v_id: 12,
        v_vehicleId: 5,
        v_companyId: 1,
        v_created_at: '2022-09-26T00:39:44.687Z',
        v_updated_at: null,
        v_deleted_at: null
    }

    const mockVehicle = {};
    const mockCompany = {};

    const mockParkRepository = {
        getVehicleInPark: jest.fn().mockResolvedValueOnce(mockPark),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ParkService,
                {
                    provide: ParkRepository,
                    useValue: mockParkRepository
                },
                {
                    provide: VehicleService,
                    useValue: mockVehicle
                },
                {
                    provide: CompanyService,
                    useValue: mockCompany
                },
            ],
        }).compile();
        
        service = await module.get<ParkService>(ParkService);
        repository = await module.get<ParkRepository>(ParkRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getVehicleInPark',() => {
        it('should return vehicle in park', async () => {
            const id = 1;
            const result = await service.getVehicleInPark(id);

            expect(repository.getVehicleInPark).toHaveBeenCalled();
            expect(result).toEqual(mockPark);
        });
    });

});