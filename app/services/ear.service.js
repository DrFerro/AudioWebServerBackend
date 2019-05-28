const fs = require('fs');

// Write the path of the music styles folder.
const earFolder = '../../../../MusicFolder';

module.exports = {
    getStylesFolders,
    getBandsFolders,
    getDiscsFolders,
    getSongsNames
};

async function getStylesFolders() {
    return fs.readdirSync(earFolder);
}

async function getBandsFolders(style) {
    return fs.readdirSync(earFolder + '/' +style);
}

async function getDiscsFolders(style, band) {
    return fs.readdirSync(earFolder + '/' + style + '/' + band);
}

async function getSongsNames(style, band, disc) {
    return fs.readdirSync(earFolder + '/' + style + '/' + band + '/' + disc);
}
