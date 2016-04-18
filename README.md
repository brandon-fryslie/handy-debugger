# handy-debugger

Run your Node.js apps in an Electron window for dead-simple debugging

This works by starting an Electron instance, and then loading your code into the Electron instance.

## Why not use node-inspector, debugger, or XYZ npm package?

- less dependencies
- handy-debugger will hot-reload code changes and rerun your script when you refresh the window (ctrl/cmd + r), unlike node-inspector
- does not install electron-prebuilt locally, relying on a globally installed Electron binary
- provides stdout and stderr both on the command line, and in the devtools
- stdin in the terminal will continue to work as expected for interactive node software
- generally works more consistently and throws less errors, which is useful in a debugging tool

## Dependencies

You must have the Electron binary available on your path:

`npm install -g electron-prebuilt`

## usage

### From the command line (preferred):

`handy-debugger path/to/my/script anArgument anotherArg endlessArgs ...`

`handy-debugger global-npm-command someArg`

### In your script:
```
if (!require('handy-debugger')()) {
  doTheScriptStuff();
}
```

The guard is required to prevent your script continuing to run outside of the debugger instance.  The debugger will launch your script as well,

You should prevent your script from doing work if it is running outside Electron, as Electron will launch your script as well, potentially leading to two copies of your script executing in parallel.

Note: You may need to refresh the electron window after the initial load to hit your breakpoints.  Refreshing the debugger will reload any code changes and rerun the script.

## API

### `var spawn = require('handy-debugger')`

Returns a function that spawns the debugger.  The function will return `false` when your script is being run in the debugger.
The function will return the Electron child process when your script is running outside of the debugger.
