class TestController {
}

TestController.index = (request, response) => {
  response.render('test', {
    track_js: process.env.HOST + "/track.js"
  });
}

module.exports = TestController;
