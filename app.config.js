const dotenv = require("dotenv");

dotenv.config();

module.exports = ({ config }) => ({
  ...config,
  name: "ButuanNews",
  slug: "butuannews",
  extra: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
});
