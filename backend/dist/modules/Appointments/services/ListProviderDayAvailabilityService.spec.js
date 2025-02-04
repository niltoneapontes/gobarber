"use strict";

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeAppointmentsRepository;
let listProviderDayAvailability;
describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderDayAvailability = new _ListProviderDayAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      date: new Date(2020, 11, 20, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      date: new Date(2020, 11, 20, 15, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 11, 20, 11).getTime();
    });
    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 12,
      day: 20
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: false
    }, {
      hour: 10,
      available: false
    }, {
      hour: 13,
      available: true
    }, {
      hour: 14,
      available: false
    }, {
      hour: 15,
      available: false
    }, {
      hour: 16,
      available: true
    }]));
  });
});