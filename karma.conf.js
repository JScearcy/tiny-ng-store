module.exports = function(config) {
  config.set({
    basePath: './spec',
    frameworks: ['jasmine'],
    files: [
        '../node_modules/jasmine-core/lib/jasmine-core/jasmine.css',
        '../node_modules/zone.js/dist/zone.js',
        '../node_modules/reflect-metadata/Reflect.js',
        '../node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
        '../node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
        '../node_modules/jasmine-core/lib/jasmine-core/boot.js',
        '../node_modules/systemjs/dist/system.src.js',
        'tiny-ng-store.spec.html'
    ]
  });
};