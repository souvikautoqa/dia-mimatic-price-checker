const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './src/tests/*_test.js',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'https://api.diadata.org/v1/',
      timeout: 80000,
      defaultHeaders: {
        "content-type": "application/json",
      },
    }
  },
  include: {
    I: './src/tests/steps_file.js'
  },
  name: 'diae2etests'
}