var ipc = require('electron').ipcRenderer;
var path = require('path')
var consoleModule = require('console');

// Exit script when Electron exits
process.exit = require('remote').require('app').quit

// Strip console colors for display in the devtools console
var stripColors = function(args) {
  return args.map(function(arg) {
    if (typeof arg === 'string') {
      arg = arg.replace(/(\x1b)?\[[0-9;]*m/g, '');
    }
    return arg;
  });
}

// Send stdout to both terminal and devtools
var _log = console.log;
console.log = function() {
  strippedArgs = stripColors(Array.prototype.slice.call(arguments));
  _log.apply(console, strippedArgs)
  consoleModule.log.apply(this, arguments)
}

// Send errors to terminal
window.addEventListener('error', function (e) {
  consoleModule.error(e.error.stack || 'Uncaught ' + e.error)
})

ipc.on('args', function (e, args) {
  process.argv = args.slice(1);
  var scriptPath = path.isAbsolute(args[2]) ? args[2] : path.join(process.cwd(), args[2]);
  require(scriptPath);
})
process.stdin._read = function (n) {
  ipc.send('stdin.read', n)
}

ipc.on('stdin.data', function (e, buf) {
  process.stdin.push(buf)
})
