var child_process = require('child_process');
var path = require('path');

module.exports = function() {
  if (process.argv[0].match(/node$/)) {
    var scriptName = process.argv[1];
    var scriptArgs = process.argv.slice(2);
    var args = [path.resolve(__dirname, 'cli.js'), scriptName].concat(scriptArgs);
    var electron = child_process.spawn('electron', args);
    electron.stdout.pipe(process.stdout);
    electron.stderr.pipe(process.stderr);
    return electron;
  } else {
    return false;
  }
}
