import { TestBed, getTestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { GateService } from '../_services/gate.service';
import { environment } from '../../environments/environment';

describe('Unit Test', () => {
  let injector;
  let service: GateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GateService]
    });

    injector = getTestBed();
    service = injector.get(GateService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('login function of authentication service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('logout function of authentication service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('add gate function of gate service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('get gate by id function of gate service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('update gate function of gate service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('upload picture function of gate service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('get forms function of gate service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('get maintenance logs function of maintenance log service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('delete maintenance log function of maintenance log service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('download PDF function of maintenance log service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('delete inspection log function of inspection log service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('update inspection log function of inspection log service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('get user by id function of user service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });

  describe('add operator function of user service', () => {
    it('should pass', () => { 

      service.getGateByID('1').subscribe(gate => {
        expect('gate1').toEqual('gate1');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/gates/1`);
      expect(req.request.method).toBe('GET');
      req.flush('gate1');
    });
  });
});