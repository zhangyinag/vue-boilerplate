// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your Vue.js + TypeScript App')
      .assert.elementCount('img', 1)
      .end()
  },
  'login test': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL + '/#/login')
      .waitForElementVisible('.login-box', 5000)
      .assert.elementPresent('input[name="username"]')
      .setValue('input[name="username"]', 'user')
      .assert.elementPresent('input[name="password"]')
      .setValue('input[name="password"]', '123456')
      .assert.elementPresent('.login-box-form__button')
      .click('.login-box-form__button')
      .pause(5000)
      .assert.elementPresent('.layout')
      .end()
  }
}
