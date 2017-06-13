const ApplicationController = require('./application_controller.js');
const SiteRepository = require('../repositories/site_repository.js');
const UserRepository = require('../repositories/user_repository.js');

class SitesController extends ApplicationController {
  static async index(request, response) {
    const siteRepo = new SiteRepository(request.app.pool);
    const userRepo = new UserRepository(request.app.pool);

    const user = await userRepo.find(request.session.user_id);
    const sites = await siteRepo.whereUserId(user.id);

    response.render('sites/index', {
      sites: sites,
    });
  };

  static async show(request, response) {
    const siteRepo = new SiteRepository(request.app.pool);
    const site = await siteRepo.find(request.params["siteId"]);

    response.render('sites/show', {
      site: site,
    });
  };

  static async create(request, response) {
    const siteRepo = new SiteRepository(request.app.pool);

    response.render('sites/create', {});
  }

  static async store(request, response) {
    const siteRepo = new SiteRepository(request.app.pool);
    const site = await siteRepo.insert(request.body["name"]);

    const userSite = await siteRepo.insertUsersSites(request.session.user_id, site.id);

    if (site && userSite) {
      request.flash('success', 'Site successfully created.');
      response.redirect('/sites');
    } else {
      request.flash('danger', 'Something went wrong!');
      response.render('sites/create', {
        site: site,
      });
    }
  }

  static async destroy(request, response) {
    const siteRepo = new SiteRepository(request.app.pool);
    await siteRepo.destroy(request.params["siteId"]);
    response.redirect('/sites');
  }
}

module.exports = SitesController;
