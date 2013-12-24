module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'components/es5-shim/es5-shim.js',
      'components/es5-shim/es5-sham.js',
      'components/jquery/jquery.js',

      'components/jasmine-jquery/lib/jasmine-jquery.js',
      'components/jasmine-flight/lib/jasmine-flight.js',

      // hack to load RequireJS after the shim libs
      'node_modules/requirejs/require.js',
      'node_modules/karma-requirejs/lib/adapter.js',

      // loaded with require
      {pattern: 'components/**/*.js', included: false},
      {pattern: 'test/spec/*.js', included: false},
      {pattern: 'lib/**/*.js', included: false},

      'test/test-main.js'
    ],
    browsers: [
      'Chrome',
      'Firefox',
      'PhantomJS'
    ],
    reporters: [
      'dots'
    ],
    autoWatch: true,
    singleRun: false
  });
};