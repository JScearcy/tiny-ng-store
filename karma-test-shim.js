Error.stackTraceLimit = Infinity;
 
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
 
__karma__.loaded = function() {};

 System.config({
                map: {
                    'tiny-ng-store': 'base/',
                    '@angular': 'base/node_modules/@angular',
                    'rxjs': 'base/node_modules/rxjs'
                },
                packages: {
                    'spec': { defaultExtension: 'js' },
                    '@angular/core': { main: 'index.js', defaultExtension: 'js' },
                    'rxjs': { defaultExtension: 'js' },
                    'tiny-ng-store': {defaultExtension: 'js'}
                }
            });

System.import('base/spec/tiny-ng-store.spec.js')
    .then(function() { __karma__.start(); }, function(error) { __karma__.error(error.stack || error); })
    .catch(console.error.bind(console));