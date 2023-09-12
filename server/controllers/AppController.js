class AppController {
  async index(req, res) {
    const options = {
      root: __dirname + '/../../client/build/',
    };
    res.sendFile('index.html', options);
  };
}

module.exports = AppController;