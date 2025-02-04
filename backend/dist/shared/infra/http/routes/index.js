"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/Users/infra/http/routes/users.routes"));

var _appointments = _interopRequireDefault(require("../../../../modules/Appointments/infra/http/routes/appointments.routes"));

var _providers = _interopRequireDefault(require("../../../../modules/Appointments/infra/http/routes/providers.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/Users/infra/http/routes/sessions.routes"));

var _password = _interopRequireDefault(require("../../../../modules/Users/infra/http/routes/password.routes"));

var _profile = _interopRequireDefault(require("../../../../modules/Users/infra/http/routes/profile.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/appointments', _appointments.default); // o "use" irá funcionar para qualquer rota.

routes.use('/providers', _providers.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/password', _password.default);
routes.use('/profile', _profile.default);
var _default = routes;
exports.default = _default;