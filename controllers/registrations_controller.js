const ApplicationController = require('./application_controller.js');
const UserRepository = require('../repositories/user_repository.js');

class RegistrationsController extends ApplicationController {
  static async create(request, response) {
    response.render('registrations/create', {});
  }

  static async store(request, response) {
    const userRepo = new UserRepository(request.app.pool);

    const user = await userRepo.insert(request.body['name'],
      request.body['email'], request.body['password']);

    if (user) {
      request.flash('success', 'Account created!');
      response.redirect('/');
    } else {
      request.flash('danger', 'An unrecoverable error happened.');
      response.render('registrations/create', {});
    }
  }
}

module.exports = RegistrationsController;
