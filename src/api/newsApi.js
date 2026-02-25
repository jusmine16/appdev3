import axios from "axios";
import Constants from "expo-constants";

const BASE_URL = "https://gnews.io/api/v4";

function getToken() {
  const key = Constants?.expoConfig?.extra?.NEWS_API_KEY;

  if (!key) {
    throw new Error(
      "Missing NEWS_API_KEY. Create a .env file (see .env.example) and restart Expo."
    );
  }

  return key;
}

function normalizeGNewsArticle(a) {
  const url = a?.url;

  return {
    title: a?.title || "",
    description: a?.description || "",
    content: a?.content || "",
    url: url,
    urlToImage: a?.image || null,
    publishedAt: a?.publishedAt || null,
    author: a?.source?.name || null,
    source: {
      name: a?.source?.name || "",
    },
  };
}

export async function fetchTopHeadlines({ country = "ph" } = {}) {
  const token = getToken();
  const url = `${BASE_URL}/top-headlines`;

  const res = await axios.get(url, {
    params: { country, token },
  });

  const articles = res?.data?.articles || [];
  return articles.map(normalizeGNewsArticle);
}

export async function searchNews({ query }) {
  const token = getToken();
  const url = `${BASE_URL}/search`;

  const res = await axios.get(url, {
    params: {
      q: query,
      lang: "en",
      token,
    },
  });

  const articles = res?.data?.articles || [];
  return articles.map(normalizeGNewsArticle);
}
