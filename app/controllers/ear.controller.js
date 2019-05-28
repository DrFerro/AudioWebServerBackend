const { Router } = require('express');
const router = Router();
const fs = require('fs');

const earService = require('../services/ear.service');
var jwt = require('jsonwebtoken');
const config = require('config.json');

// Routes
router.get('/styles', getStyles);
router.get('/bands', getBands);
router.get('/discs', getDiscs);
router.get('/songs', getSongs);
router.get('/song', getSong);

module.exports = router;

function getStyles(req, res, next) {
    earService.getStylesFolders()
        .then(styles => res.json(styles))
        .catch(err => next(err));
}

function getBands(req, res, next) {
    earService.getBandsFolders(req.query.style)
        .then(bands => res.json(bands))
        .catch(err => next(err));
}

function getDiscs(req, res, next) {
    earService.getDiscsFolders(req.query.style, req.query.band)
        .then(discs => res.json(discs))
        .catch(err => next(err));
}

function getSongs(req, res, next) {
    earService.getSongsNames(req.query.style, req.query.band, req.query.disc)
        .then(songs => res.json(songs))
        .catch(err => next(err));
}

// This function works here for streaming
function getSong(req, res, next) {

    var decoded;
    if(req.query.token) {
      decoded = jwt.verify(req.query.token, config.secret);
    }

    if(decoded) {
      // Here you must write the path of the music styles folder and follow the structure of folders
      // MusicFolder/StylesFolders/BandsFolders/DiscsFolders/SongFiles
      var musicFolder = 'MusicFolder';
      var filePath = '../../../../' + musicFolder + '/' + req.query.style + '/' + req.query.band + '/' + req.query.disc + '/' + req.query.song;
      if (fs.existsSync(filePath)) {
        var rstream = fs.createReadStream(filePath);
        rstream.pipe(res);
      } else {
        console.log("GETTING INEXISTS FILE");
        res.status(404).send("Its a 404");
        res.end();
      }

    } else {
        res.status(401).send({ message: 'No auth' });
    }
}
