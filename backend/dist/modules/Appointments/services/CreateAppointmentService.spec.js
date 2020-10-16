"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../Notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let fakeCacheProvider;
let fakeNotificationsRepository;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 9, 10).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 9, 13),
      user_id: '123456',
      provider_id: '123123123'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 11, 10, 14);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123456',
      provider_id: '123123123'
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '123456',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shoud not be able to creat an appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 16).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 15),
      user_id: '123456',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shoud not be able to creat an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 16).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 17),
      user_id: '123123123',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shoud not be able to creat an appointment before 8am', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 16).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: '123456',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shoud not be able to creat an appointment after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 16).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: '123456',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
}); // cria uma categoria