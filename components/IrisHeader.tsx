import { LucideBellDot, SignalHighIcon, Sparkles } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const IrisHeader = () => {
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>
          <SignalHighIcon color="#00FF55" size={28} />
          <View style={styles.statusDot} />
        </View>
        
        <View style={styles.centerSection}>
          <Text style={styles.title}>
            IRIS
            <Text style={styles.titleAccent}>-X</Text>
          </Text>
          <Text style={styles.subtitle}>ULTRA PRO</Text>
        </View>
        
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.bellButton}>
            <LucideBellDot color="#00FF55" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusItem}>
          <Sparkles color="#00FF55" size={12} />
          <Text style={styles.statusText}>ALL FEATURES</Text>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.statusDotSmall, { backgroundColor: "#00FF55" }]} />
          <Text style={styles.statusText}>ACTIVE</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusText}>v2.0</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 255, 85, 0.2)",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  centerSection: {
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
    fontFamily: "monospace",
  },
  titleAccent: {
    color: "#00FF55",
  },
  subtitle: {
    color: "#00FF55",
    fontSize: 8,
    fontFamily: "monospace",
    letterSpacing: 2,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00FF55",
  },
  bellButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 85, 0.1)",
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusDotSmall: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  statusText: {
    color: "#888888",
    fontSize: 8,
    fontFamily: "monospace",
    letterSpacing: 1,
  },
});

export default IrisHeader;
