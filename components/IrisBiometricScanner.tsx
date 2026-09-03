import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";

export default function IrisBiometricScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const [confidence, setConfidence] = useState(0.98);
  const [securityLevel, setSecurityLevel] = useState("ULTRA_PRO");
  const [featuresUnlocked, setFeaturesUnlocked] = useState(true);
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous pulse animation when authenticated
    if (authenticated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [authenticated]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setAuthenticated(true);
      setConfidence(0.97 + Math.random() * 0.02);
      setSecurityLevel("ULTRA_PRO");
      setFeaturesUnlocked(true);
    }, 800);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>🔓 IRIS-X SECURITY</Text>
        <Animated.View
          style={[
            styles.badge,
            { 
              backgroundColor: authenticated ? "rgba(0, 255, 85, 0.2)" : "rgba(255, 0, 122, 0.2)",
              transform: [{ scale: pulseAnim }]
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: authenticated ? "#00FF55" : "#FF007A" },
            ]}
          >
            {isScanning ? "SCANNING..." : authenticated ? "ULTRA PRO ACTIVE" : "LOCKED"}
          </Text>
        </Animated.View>
      </View>

      <Text style={styles.metricsText}>
        SECURITY LEVEL: {securityLevel} (ALL FEATURES)
      </Text>
      <Text style={styles.metricsText}>
        CONFIDENCE: {(confidence * 100).toFixed(1)}% | STATUS: UNLOCKED
      </Text>
      <Text style={styles.metricsText}>
        PLAN: ULTRA PRO | EXPIRY: NEVER | PAYMENT: FREE
      </Text>

      {/* Simulated Waveform Analyzer Bars */}
      <View style={styles.waveRow}>
        {[0.4, 0.8, 0.3, 0.95, 0.6, 1.0, 0.7, 0.45, 0.85, 0.2, 0.9, 0.5].map((val, idx) => (
          <View
            key={idx}
            style={[
              styles.waveBar,
              {
                height: isScanning ? Math.random() * 28 + 6 : val * 24 + 4,
                backgroundColor: idx % 3 === 0 ? "#00FF55" : idx % 3 === 1 ? "#00F0FF" : "#7000FF",
              },
            ]}
          />
        ))}
      </View>

      {/* Features Status */}
      <View style={styles.featuresRow}>
        {["VOICE", "TTS", "STT", "SCREEN", "MEMORY"].map((feature, idx) => (
          <View key={idx} style={styles.featureBadge}>
            <Text style={styles.featureText}>✓ {feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, isScanning && styles.buttonActive]}
        onPress={handleScan}
        disabled={isScanning}
      >
        <Text style={styles.buttonText}>
          {isScanning ? "VERIFYING..." : "ALL FEATURES UNLOCKED"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#0A0A0F",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 85, 0.3)",
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: "#00FF55",
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  metricsText: {
    color: "#A0AEC0",
    fontSize: 10,
    fontFamily: "monospace",
    marginVertical: 2,
  },
  waveRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 36,
    marginVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 8,
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
  },
  featuresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginVertical: 8,
  },
  featureBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "rgba(0, 255, 85, 0.15)",
  },
  featureText: {
    color: "#00FF55",
    fontSize: 9,
    fontFamily: "monospace",
  },
  button: {
    marginTop: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#00FF55",
    alignItems: "center",
  },
  buttonActive: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
});
