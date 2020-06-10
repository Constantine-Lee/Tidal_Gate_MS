// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter'),
      require('karma-coverage')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/compiler-playground'),
      reports: ['html', 'lcovonly', 'text-summary'],      
      fixWebpackSourcePaths: true
    },
    
    junitReporter: { outputDir: 'testresults/junit', outputFile: 'unit-test-result.xml', useBrowserName: false },
    coverageReporter: {
      type: 'cobertura', dir: 'testresults', subdir: 'coverage', file: 'code-coverage.xml'
    },
    reporters: ['progress', 'kjhtml', 'junit', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true
  });
};
