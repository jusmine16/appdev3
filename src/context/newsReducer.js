export const initialState = {
  articles: [],
  loading: false,
  error: null,
  query: "",
  bookmarks: [],
};

export function newsReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, articles: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "LOAD_BOOKMARKS":
      return { ...state, bookmarks: action.payload || [] };
    case "TOGGLE_BOOKMARK": {
      const article = action.payload;
      const key = article?.url;
      if (!key) return state;

      const exists = state.bookmarks.some((b) => b.url === key);
      const bookmarks = exists
        ? state.bookmarks.filter((b) => b.url !== key)
        : [article, ...state.bookmarks];

      return { ...state, bookmarks };
    }
    default:
      return state;
  }
}
