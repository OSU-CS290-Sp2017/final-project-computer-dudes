const UserRepository = require('../repositories/user_repository.js');

class ApplicationController {
  constructor(request, response) {
    this.userRepo = new UserRepository(request.app.pool);
  }

  currentUser() {
    // this.userRepo.find()
  }
}

module.exports = ApplicationController;
