import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Easing } from "react-native";

export default function IrisHolographicOrb() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous Pulsing Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation Loop
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Glow Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Ring Animation
    Animated.loop(
      Animated.timing(ringAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [pulseAnim, rotateAnim, glowAnim, ringAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spinReverse = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  return (
    <View style={styles.container}>
      {/* Outer Holographic Glow Ring */}
      <Animated.View
        style={[
          styles.outerRing,
          {
            transform: [{ scale: pulseAnim }, { rotate: spin }],
          },
        ]}
      />

      {/* Middle Ring */}
      <Animated.View
        style={[
          styles.middleRing,
          {
            transform: [{ scale: pulseAnim }, { rotate: spinReverse }],
          },
        ]}
      />

      {/* Inner Ring */}
      <Animated.View
        style={[
          styles.innerRing,
          {
            transform: [{ scale: pulseAnim }, { rotate: spin }],
          },
        ]}
      />

      {/* Inner Cyber Core Orb */}
      <Animated.View
        style={[
          styles.coreOrb,
          {
            transform: [{ scale: pulseAnim }],
            opacity: glowAnim,
          },
        ]}
      >
        <Text style={styles.coreText}>IRIS</Text>
        <Text style={styles.subText}>AI NODE</Text>
        <Text style={styles.versionText}>v2.0 FREE</Text>
      </Animated.View>

      {/* Status Indicators */}
      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: "#00FF55" }]} />
          <Text style={styles.statusText}>ULTRA PRO</Text>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: "#00F0FF" }]} />
          <Text style={styles.statusText}>ALL FEATURES</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  outerRing: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "#00F0FF",
    borderStyle: "dashed",
    backgroundColor: "rgba(0, 240, 255, 0.03)",
  },
  middleRing: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1.5,
    borderColor: "#7000FF",
    backgroundColor: "rgba(112, 0, 255, 0.05)",
  },
  innerRing: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#FF007A",
    backgroundColor: "rgba(255, 0, 122, 0.05)",
  },
  coreOrb: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#0A0A0F",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00FF55",
    shadowColor: "#00FF55",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 15,
  },
  coreText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 3,
    fontFamily: "monospace",
  },
  subText: {
    color: "#00FF55",
    fontSize: 8,
    fontFamily: "monospace",
    letterSpacing: 2,
  },
  versionText: {
    color: "#00F0FF",
    fontSize: 7,
    fontFamily: "monospace",
    letterSpacing: 1,
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 15,
    marginTop: 25,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    color: "#888888",
    fontSize: 9,
    fontFamily: "monospace",
    letterSpacing: 1,
  },
});
