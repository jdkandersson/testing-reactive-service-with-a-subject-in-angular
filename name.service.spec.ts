// name.service.spec.ts
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';

import { NameService } from './name.service';

describe('NameService', () => {
  let service: NameService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new NameService(httpClientSpy);
  });

  describe('loadName', () => {
    it('should call get on HttpClient with correct URL', () => {
      // Setting up get spy
      httpClientSpy.get.and.returnValue(cold('a|', {a: null}));

      // Calling loadName
      service.loadName();

      // Checking get call
      expect(httpClientSpy.get).toHaveBeenCalledWith('name URL');
    });

    it('should emit new name on name$', () => {
      // Defining marbles
      const getSpyMarbles =   '-a|';
      const expectedMarbles = 'bc';
      // Setting up get spy
      httpClientSpy.get.and.returnValue(cold(getSpyMarbles, {a: 'name'}));

      // Calling loadName
      service.loadName();

      // Checking get call
      const expected = cold(expectedMarbles, {b: null, c: 'name'});
      expect(service.name$).toBeObservable(expected);
    });

    it('should emit nothing on name$ if an error occurs', () => {
      // Defining marbles
      const getSpyMarbles =   '-#|';
      const expectedMarbles = 'a';
      // Setting up get spy
      httpClientSpy.get.and.returnValue(cold(getSpyMarbles));

      // Calling loadName
      service.loadName();

      // Checking get call
      const expected = cold(expectedMarbles, {a: null});
      expect(service.name$).toBeObservable(expected);
    });
  });
});
