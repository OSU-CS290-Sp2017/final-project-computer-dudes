const SiteRepository = require('../repositories/site_repository.js');
const UserRepository = require('../repositories/user_repository.js');

class DashboardController {
  static async index(request, response) {
    const siteRepo = new SiteRepository(request.app.pool);
    const sites = await siteRepo.all();
 
    const userRepo = new UserRepository(request.app.pool);
    const user = await userRepo.find(request.session.user_id);

    response.render('dashboard/index', {
      sites: sites,
    });
  };
  
  static async show(request, response) {
    const siteId = request.params["siteId"];
  
    response.render('dashboard/show', {
      siteId: siteId,
    });
  };
}

module.exports = DashboardController;
