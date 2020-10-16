"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/Users/providers");

require("./providers");

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/Appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/Users/infra/typeorm/repository/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/Users/infra/typeorm/repository/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/Notifications/infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('AppointmentsRepository', _AppointmentsRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.default);

_tsyringe.container.registerSingleton('NotificationsRepository', _NotificationsRepository.default);