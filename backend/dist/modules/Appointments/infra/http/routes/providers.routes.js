"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../Users/infra/http/middlewares/ensureAuthenticated"));

var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));

var _ProviderMonthAvailability = _interopRequireDefault(require("../controllers/ProviderMonthAvailability"));

var _ProviderDayAvailability = _interopRequireDefault(require("../controllers/ProviderDayAvailability"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providersController = new _ProvidersController.default();
const providerMonthAvailabilityController = new _ProviderMonthAvailability.default();
const providerDayAvailabilityController = new _ProviderDayAvailability.default();
const providersRouter = (0, _express.Router)();
providersRouter.use(_ensureAuthenticated.default);
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerDayAvailabilityController.index);
var _default = providersRouter;
exports.default = _default;