import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const apps = [
  { name: "WhatsApp", color: "#25D366" },
  { name: "YouTube", color: "#FF0000" },
  { name: "Chrome", color: "#4285F4" },
  { name: "Gmail", color: "#EA4335" },
  { name: "Maps", color: "#34A853" },
  { name: "Camera", color: "#000000" },
  { name: "Photos", color: "#FBBC05" },
  { name: "Settings", color: "#607D8B" },
];

export default function AppsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>APPS</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {apps.map((app, idx) => (
          <TouchableOpacity key={idx} style={styles.appItem}>
            <View style={[styles.appIcon, { backgroundColor: app.color }]}>
              <Text style={styles.appInitial}>{app.name[0]}</Text>
            </View>
            <Text style={styles.appName}>{app.name}</Text>
          </TouchableOpacity>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  appItem: {
    alignItems: "center",
    width: 70,
  },
  appIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  appInitial: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  appName: {
    color: "#888888",
    fontSize: 10,
    fontFamily: "monospace",
    marginTop: 6,
    textAlign: "center",
  },
});
