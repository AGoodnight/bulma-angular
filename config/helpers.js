var path = require('path');

// Helper functions
var ROOT = path.resolve(__dirname, '..');
var DIST = path.resolve(__dirname, '../dist');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

function dist(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [DIST].concat(args));
}

exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
exports.dist = dist;
