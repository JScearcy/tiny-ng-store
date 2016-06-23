module.exports = function(config) {
    config.set({
 
        basePath: './',
 
        frameworks: ['jasmine'],
 
        files: [
            {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
            {pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: true},
            {pattern: 'node_modules/reflect-metadata/Reflect.js', included: true, watched: true},
            {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true},
            {pattern: 'karma-test-shim.js', included: true, watched: true},
 
            {pattern: 'tiny-ng-store.js', included: false, watched: true},
            {pattern: 'node_modules/@angular/core/**/*.js', included: false, watched: true},
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: true},
            {pattern: 'spec/tiny-ng-store.spec.js', included: false, watched: true},

            {pattern: 'tiny-ng-store.ts', included: false, watched: false}
        ],
 
        port: 9876,
 
        logLevel: config.LOG_INFO,
 
        colors: true,
 
        autoWatch: true,
 
        browsers: ['Firefox'],
 
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-firefox-launcher'
        ],
 
        reporters: ['progress', 'dots', 'coverage'],
 
        preprocessors: {
            '!(*spec).js': ['coverage']
        },
 
        coverageReporter: {
            reporters:[
                {type: 'html', subdir: '.', file: 'coverage-final.json'}
            ]
        },
 
        singleRun: false
    })
};