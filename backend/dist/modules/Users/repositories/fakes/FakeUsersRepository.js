"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async findById(id) {
    const foundUser = this.users.find(user => user.id === id);
    return foundUser;
  }

  async findByEmail(email) {
    const foundUser = this.users.find(user => user.email === email);
    return foundUser;
  }

  async findAllProviders({
    except_user_id
  }) {
    let {
      users
    } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  async create(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuidv.uuid)()
    }, userData);
    this.users.push(user);
    return user;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;