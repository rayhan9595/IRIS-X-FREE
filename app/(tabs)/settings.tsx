import React from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";

const settings = [
  { label: "Voice Activation", value: true },
  { label: "Background Listening", value: true },
  { label: "Screen Control", value: true },
  { label: "WhatsApp Automation", value: true },
  { label: "Auto-Reply", value: false },
  { label: "Dark Mode", value: true },
];

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SETTINGS</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {settings.map((setting, idx) => (
          <View key={idx} style={styles.settingRow}>
            <Text style={styles.settingLabel}>{setting.label}</Text>
            <Switch
              value={setting.value}
              trackColor={{ false: "#333333", true: "#00FF55" }}
              thumbColor="#FFFFFF"
            />
          </View>
        ))}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>IRIS-X v2.0</Text>
          <Text style={styles.versionText}>ULTRA PRO - FREE</Text>
          <Text style={styles.versionText}>All Features Unlocked</Text>
        </View>
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
    gap: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 85, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 85, 0.2)",
    borderRadius: 12,
    padding: 16,
  },
  settingLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
  },
  versionInfo: {
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 255, 85, 0.2)",
  },
  versionText: {
    color: "#888888",
    fontSize: 10,
    fontFamily: "monospace",
    letterSpacing: 1,
    marginBottom: 4,
  },
});
