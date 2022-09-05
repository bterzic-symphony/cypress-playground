const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demo.realworld.io/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env:
  {
    existingUsername: 'tikva123@mailinator.com',
    existingPassword: 'password4qa'
  }
});
