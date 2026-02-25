import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { formatDate } from "../utils/formatDate";

export default function NewsCard({ article, onPress, isBookmarked }) {
  const title = article?.title || "Untitled";
  const source = article?.source?.name || "Unknown source";
  const date = formatDate(article?.publishedAt);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      {article?.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.source} numberOfLines={1}>
            {source}
          </Text>
          {isBookmarked ? <Text style={styles.bookmarkTag}>Saved</Text> : null}
        </View>

        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>

        {!!date && <Text style={styles.date}>{date}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  image: { width: "100%", height: 180, backgroundColor: "#F3F4F6" },
  imagePlaceholder: {
    width: "100%",
    height: 180,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: { color: "#6B7280", fontWeight: "700" },
  content: { padding: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  source: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "800",
    flex: 1,
    paddingRight: 10,
  },
  bookmarkTag: { fontSize: 12, fontWeight: "800", color: "#059669" },
  title: { fontSize: 16, fontWeight: "800", marginTop: 6, color: "#111827" },
  date: { fontSize: 12, color: "#6B7280", marginTop: 6 },
});
