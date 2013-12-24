module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ["jasmine", "requirejs"],
    files: [
      'components/jquery/jquery.js',
      'components/jasmine-jquery/lib/jasmine-jquery.js',
      'components/jasmine-flight/lib/jasmine-flight.js',

      // loaded with require
      {pattern: 'components/**/*.js', included: false},
      {pattern: 'test/spec/*.js', included: false},
      {pattern: 'lib/**/*.js', included: false},

      'test/test-main.js'
    ],
    browsers: [
      'Chrome',
      'Firefox'
    ],
    reporters: [
      'dots'
    ],
    autoWatch: true,
    singleRun: false
  });
};