var path = require('path');
var _ = require('lodash');

var pattern = function (file) {
  return {pattern: file, included: true, served: true, watched: false};
};

var endsWith = function(substr) {
  return function(str) {
    return str.indexOf(substr) === (str.length - substr.length);
  };
};

var framework = function(files) {
  var chaiPath = path.resolve(require.resolve('chai'), '../chai.js');
  if (!_(files).map('pattern').find(endsWith(path.relative(__dirname, chaiPath)))) {
    files.unshift(pattern(chaiPath));
  }

  files.push(pattern(path.resolve(require.resolve('dirty-chai'))));
};

framework.$inject = ['config.files'];

module.exports = {'framework:dirty-chai': ['factory', framework]};
