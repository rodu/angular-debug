# angular-debug

The module provides a debug facility to enhance application debugging.

The main features include coloured module names and conditional enabling in production using a query string parameter (debug=true).

The debug will provide details of the modules that call the debug function so to allow to identify which code is logging messages also when the application is minified.

To use the debug, require the module and the `debugService`, then instantiate a local variable `debug` like so:

```JavaScript
var debug = debugService('moduleName');

// later...
debug('message1', 'message2') as usual
```

This will allow to augment the log messages by prepending the moduleName in
the console output.

## Enable and disable debug output

Once the application is in production it would be a good idea to disable debugging. In some browsers, logging to the console can slow down the program execution.

There are two ways in which debugging can be conditionally enabled (and disabled). The first is by changing the value of the `DEBUG` constant to false. This should be done before releasing the application to production.

Later, if we desire to enable debugging at any time, we can add a query string parameter in the browser url, like so: `?debug=true`.
Reloading the application by passing such parameter we should start to see log lines in the console.

## Filtering output

Some debug libraries include the possibility to filter the output to narrow the scope to some specific modules. In this library this option is not implemented. In fact, it is very easy to obtain the same result (in the browser console) by using some [filter facility provided](https://developer.chrome.com/devtools/docs/console#filtering-console-output) with most developer tools. In the case of Chrome DevTools, it will be possible to enter a module name in the filter box to match the module we are interested seeing logged.

