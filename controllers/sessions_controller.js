const UserRepository = require('../repositories/user_repository.js');

class SessionsController {
  static async create(request, response) {
    response.render("sessions/create", {});
  }

  static async store(request, response) {
    const userRepo = new UserRepository(request.app.pool);
    const user = await userRepo.findByEmailAndPassword(
      request.body['email'], request.body['password']);

    if (user) {
      request.session.user_id = user['id'];
      request.flash('success', 'Successfully logged in.');
      response.redirect('/');
    } else {
      request.flash('danger', 'Invalid email or password.');
      response.render("sessions/create", {
        email: request.body["email"],
      });
    }
  }

  static async destroy(request, response) {
  }
}

module.exports = SessionsController;
