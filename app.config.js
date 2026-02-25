import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "ButuanNews",
  slug: "butuannews",
  extra: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
});