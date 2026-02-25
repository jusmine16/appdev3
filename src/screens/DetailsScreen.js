import React, { useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { useNews } from "../context/NewsContext";
import { formatDate } from "../utils/formatDate";

export default function DetailsScreen({ route }) {
  const { state, actions } = useNews();
  const article = route?.params?.article;

  const isBookmarked = useMemo(() => {
    const url = article?.url;
    if (!url) return false;
    return (state.bookmarks || []).some((b) => b.url === url);
  }, [state.bookmarks, article]);

  const onOpen = async () => {
    const url = article?.url;
    if (!url) return;
    const can = await Linking.canOpenURL(url);
    if (can) Linking.openURL(url);
  };

  const onToggleBookmark = () => {
    if (article) actions.toggleBookmark(article);
  };

  const title = article?.title || "Untitled";
  const source = article?.source?.name || "Unknown source";
  const author = article?.author || "Unknown author";
  const published = formatDate(article?.publishedAt);
  const description = article?.description || "";
  const content = article?.content || "";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {article?.urlToImage ? (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>No Image</Text>
          </View>
        )}

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.meta}>
          {source} {"  "}•{"  "} {author}
        </Text>
        {!!published && <Text style={styles.date}>{published}</Text>}

        {!!description && <Text style={styles.section}>{description}</Text>}
        {!!content && <Text style={styles.content}>{content}</Text>}

        <View style={styles.buttons}>
          <Pressable style={styles.primaryBtn} onPress={onOpen}>
            <Text style={styles.primaryBtnText}>Open in Browser</Text>
          </Pressable>

          <Pressable
            style={[styles.secondaryBtn, isBookmarked ? styles.saved : null]}
            onPress={onToggleBookmark}
          >
            <Text style={styles.secondaryBtnText}>
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9FAFB" },
  container: { paddingBottom: 24 },
  image: { width: "100%", height: 240, backgroundColor: "#F3F4F6" },
  imagePlaceholder: {
    width: "100%",
    height: 240,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: { color: "#6B7280", fontWeight: "800" },
  title: {
    paddingHorizontal: 16,
    paddingTop: 14,
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },
  meta: { paddingHorizontal: 16, paddingTop: 8, color: "#2563EB", fontWeight: "800" },
  date: { paddingHorizontal: 16, paddingTop: 6, color: "#6B7280" },
  section: { paddingHorizontal: 16, paddingTop: 14, fontSize: 16, color: "#111827" },
  content: { paddingHorizontal: 16, paddingTop: 10, color: "#374151", lineHeight: 20 },
  buttons: { paddingHorizontal: 16, paddingTop: 16, gap: 10 },
  primaryBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "white", fontWeight: "900" },
  secondaryBtn: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryBtnText: { color: "white", fontWeight: "900" },
  saved: { backgroundColor: "#059669" },
});
