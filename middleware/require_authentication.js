function require_authentication() {
  return (request, response, next) => {
    if (! request.session.user_id) {
      request.flash('danger', 'You must be logged in.');
      response.redirect('/login');
    }

    next();
  };
}

module.exports = require_authentication;
