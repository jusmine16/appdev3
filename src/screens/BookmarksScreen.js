import React, { useMemo } from "react";
import { SafeAreaView, FlatList, View, Text, StyleSheet } from "react-native";
import { useNews } from "../context/NewsContext";
import NewsCard from "../components/NewsCard";

export default function BookmarksScreen({ navigation }) {
  const { state } = useNews();

  const data = useMemo(() => state.bookmarks || [], [state.bookmarks]);

  const renderItem = ({ item }) => (
    <NewsCard
      article={item}
      isBookmarked={true}
      onPress={() => navigation.navigate("Details", { article: item })}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      {data.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No bookmarks yet</Text>
          <Text style={styles.emptySub}>Open an article and tap Bookmark.</Text>
        </View>
      ) : null}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.url || `${index}`}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9FAFB" },
  empty: { padding: 20 },
  emptyTitle: { fontSize: 18, fontWeight: "900", marginBottom: 6 },
  emptySub: { color: "#4B5563" },
});
