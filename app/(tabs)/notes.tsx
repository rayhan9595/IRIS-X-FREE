import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const notes = [
  { title: "IRIS-X Free", content: "All features unlocked", time: "Just now" },
  { title: "Voice Assistant", content: "Say 'Hey IRIS' to activate", time: "1 min ago" },
  { title: "Welcome", content: "This is your AI-powered assistant", time: "5 min ago" },
];

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NOTES</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {notes.map((note, idx) => (
          <View key={idx} style={styles.noteCard}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteContent}>{note.content}</Text>
            <Text style={styles.noteTime}>{note.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  title: {
    color: "#00FF55",
    fontSize: 14,
    fontFamily: "monospace",
    letterSpacing: 3,
    marginBottom: 20,
    marginTop: 20,
  },
  list: {
    gap: 12,
  },
  noteCard: {
    backgroundColor: "rgba(0, 255, 85, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 85, 0.2)",
    borderRadius: 12,
    padding: 16,
  },
  noteTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  noteContent: {
    color: "#888888",
    fontSize: 12,
    fontFamily: "monospace",
    marginTop: 6,
  },
  noteTime: {
    color: "#00FF55",
    fontSize: 10,
    fontFamily: "monospace",
    marginTop: 8,
  },
});
