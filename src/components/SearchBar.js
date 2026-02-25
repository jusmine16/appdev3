import React from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

export default function SearchBar({ value, onChangeText, onSubmit, onClear }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder="Search news..."
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        autoCapitalize="none"
      />
      {value?.trim() ? (
        <Pressable style={styles.btn} onPress={onClear}>
          <Text style={styles.btnText}>Clear</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.btn} onPress={onSubmit}>
          <Text style={styles.btnText}>Go</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, paddingHorizontal: 12, paddingTop: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  btn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 12,
  },
  btnText: { color: "white", fontWeight: "800" },
});
