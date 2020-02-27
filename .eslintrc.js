const config = {
    plugins: [
      "prettier"
    ],
    extends: [
      "eslint-config-airbnb-base",
      "prettier"
    ],
    rules: {
      "prettier/prettier": ["error", { singleQuote: true }],
      "no-unused-vars": 1
    },
    env: {
      node: true,
      jest: true,
      es6: true
    }
  };
  
  module.exports = config;
  