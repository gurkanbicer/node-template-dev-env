const express = require('express');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const klawSync = require('klaw-sync');
const router = express.Router();
const listEndpoints = require('express-list-endpoints');

function writeOutputToDist(fileName, output) {
  try {
    fs.ensureDirSync(process.env.DIST_DIR);
    if (fileName === "/") fileName = '/index';
    fs.outputFileSync(process.env.DIST_DIR + fileName + '.html', output);
  } catch (e) {
    console.log(e);
  }
}

router.get('/', function (req, res) {
  const params = {
    title: 'Page: /'
  };
  res.render('index', params, function (err, output) {
    writeOutputToDist(req.path, output);
    res.send(output);
  });
});

router.get('/another-sample', function (req, res) {
  const params = {
    title: 'Page: /another-sample'
  };
  res.render('index', params, function (err, output) {
    writeOutputToDist(req.path, output);
    res.send(output);
  });
});

router.get('/build-all', async function (req, res) {
  try {
    const routes = listEndpoints(router);
    let successfulPaths = [];
    let failedPaths = [];

    let distPaths;
    let ignoredPaths = ['.git', '.gitignore', '.gitkeep'];

    const filterIgnoredPaths = item => {
      const basename = path.basename(item.path);
      let counter = 0;
      for (const ignoredPath of ignoredPaths) {
        if (basename === ignoredPath) counter++;
      }
      if (counter === 0) return true;
      else return false;
    };

    distPaths = klawSync(process.env.DIST_DIR, { filter: filterIgnoredPaths });
    for (const pathObj of distPaths) {
      fs.remove(pathObj.path);
      console.log(pathObj.path);
    }

    fs.ensureDirSync(process.env.DIST_DIR + '/assets');
    fs.copySync('public/assets/fonts', process.env.DIST_DIR + '/assets/fonts');
    fs.copySync('public/assets/images', process.env.DIST_DIR + '/assets/images');
    fs.copySync('public/assets/javascripts', process.env.DIST_DIR + '/assets/javascripts');
    fs.copySync('public/assets/stylesheets', process.env.DIST_DIR + '/assets/stylesheets');

    for (const route of routes) {
      if (route.path !== '/build-all') {
        await axios({
          url: 'http://localhost:' + process.env.PORT + route.path,
          method: 'GET',
          timeout: 1000,
        }).then(response => {
          successfulPaths.push(route.path);
        }).catch(error => {
          failedPaths.push(route.path);
          console.log(error);
        });
      } else {
        continue;
      }
    }

    res.json({
      'successfulPaths' : successfulPaths,
      'failedPaths' : failedPaths
    });
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
