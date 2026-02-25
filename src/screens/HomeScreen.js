import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNews } from "../context/NewsContext";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorView from "../components/ErrorView";

export default function HomeScreen({ navigation }) {
  const { state, actions } = useNews();
  const [searchText, setSearchText] = useState(state.query);

  useEffect(() => {
    actions.loadHeadlines();
  }, [actions]);

  const bookmarksSet = useMemo(() => {
    return new Set((state.bookmarks || []).map((b) => b.url).filter(Boolean));
  }, [state.bookmarks]);

  const onSubmitSearch = () => actions.runSearch(searchText);
  const onClear = () => {
    setSearchText("");
    actions.runSearch("");
  };

  const onRefresh = () => {
    if ((state.query || "").trim()) return actions.runSearch(state.query);
    return actions.loadHeadlines();
  };

  const renderItem = ({ item }) => (
    <NewsCard
      article={item}
      isBookmarked={bookmarksSet.has(item?.url)}
      onPress={() => navigation.navigate("Details", { article: item })}
    />
  );

  const keyExtractor = (item, index) => item?.url || `${index}`;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topRow}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSubmit={onSubmitSearch}
          onClear={onClear}
        />
        <View style={styles.actionsRow}>
          <Pressable
            style={styles.bookmarksBtn}
            onPress={() => navigation.navigate("Bookmarks")}
          >
            <Text style={styles.bookmarksBtnText}>View Bookmarks</Text>
          </Pressable>
        </View>
      </View>

      {state.loading && state.articles.length === 0 ? <Loading /> : null}

      {state.error ? <ErrorView message={state.error} onRetry={onRefresh} /> : null}

      {!state.loading && !state.error && state.articles.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No articles found</Text>
          <Text style={styles.emptySub}>
            Try a different search keyword or pull to refresh.
          </Text>
        </View>
      ) : null}

      <FlatList
        data={state.articles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={state.loading}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9FAFB" },
  topRow: { backgroundColor: "#F9FAFB" },
  actionsRow: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 6 },
  bookmarksBtn: {
    backgroundColor: "#111827",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  bookmarksBtnText: { color: "white", fontWeight: "800" },
  empty: { padding: 20 },
  emptyTitle: { fontSize: 18, fontWeight: "800", marginBottom: 6 },
  emptySub: { color: "#4B5563" },
});
