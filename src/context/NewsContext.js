import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchTopHeadlines, searchNews } from "../api/newsApi";
import { initialState, newsReducer } from "./newsReducer";

const NewsContext = createContext(null);
const BOOKMARKS_KEY = "BOOKMARKS_V1";

export function NewsProvider({ children }) {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        dispatch({ type: "LOAD_BOOKMARKS", payload: parsed });
      } catch (e) {
        dispatch({ type: "LOAD_BOOKMARKS", payload: [] });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(
          BOOKMARKS_KEY,
          JSON.stringify(state.bookmarks)
        );
      } catch (e) {
        // ignore persistence errors
      }
    })();
  }, [state.bookmarks]);

  const actions = useMemo(() => {
    async function loadHeadlines() {
      dispatch({ type: "FETCH_START" });
      try {
        const articles = await fetchTopHeadlines({ country: "ph" });
        dispatch({ type: "FETCH_SUCCESS", payload: articles });
      } catch (e) {
        dispatch({
          type: "FETCH_ERROR",
          payload: e?.message || "Failed to load headlines.",
        });
      }
    }

    async function runSearch(query) {
      const q = (query || "").trim();
      dispatch({ type: "SET_QUERY", payload: query });

      if (!q) {
        return loadHeadlines();
      }

      dispatch({ type: "FETCH_START" });
      try {
        const articles = await searchNews({ query: q });
        dispatch({ type: "FETCH_SUCCESS", payload: articles });
      } catch (e) {
        dispatch({
          type: "FETCH_ERROR",
          payload: e?.message || "Failed to search news.",
        });
      }
    }

    function toggleBookmark(article) {
      dispatch({ type: "TOGGLE_BOOKMARK", payload: article });
    }

    return { loadHeadlines, runSearch, toggleBookmark };
  }, []);

  const value = useMemo(() => ({ state, dispatch, actions }), [state, actions]);

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews() {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNews must be used inside NewsProvider");
  return ctx;
}
