import { Mic, MicOff, Volume2, Sparkles } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View, StyleSheet } from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const VoiceNode = () => {
  const [listening, setListening] = useState(false);
  const [voiceActive, setVoiceActive] = useState(true);
  const [aiStatus, setAiStatus] = useState("READY");
  const [securityLevel, setSecurityLevel] = useState("ULTRA_PRO");

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (listening) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: false,
          }),
        ]),
      ).start();

      // Glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.5,
            duration: 600,
            useNativeDriver: false,
          }),
        ]),
      ).start();

      setAiStatus("LISTENING");
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(0);
      glowAnim.stopAnimation();
      glowAnim.setValue(0.5);
      setAiStatus("READY");
    }
  }, [listening]);

  // Continuous rotation
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const borderColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 255, 85, 0.3)", "rgba(0, 255, 85, 1)"],
  });

  const glowColor = glowAnim.interpolate({
    inputRange: [0.5, 1],
    outputRange: ["rgba(0, 255, 85, 0.2)", "rgba(0, 255, 85, 0.6)"],
  });

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Outer Ring */}
      <Animated.View
        style={[
          styles.outerRing,
          {
            transform: [{ scale: pulseAnim }, { rotate: spin }],
            borderColor: borderColor,
          },
        ]}
      />

      {/* Middle Ring */}
      <Animated.View
        style={[
          styles.middleRing,
          {
            transform: [{ scale: pulseAnim }],
            borderColor: listening ? "rgba(0, 255, 85, 0.6)" : "rgba(0, 240, 255, 0.3)",
          },
        ]}
      />

      {/* Inner Ring */}
      <Animated.View
        style={[
          styles.innerRing,
          {
            transform: [{ scale: pulseAnim }],
            borderColor: listening ? "rgba(0, 255, 85, 0.8)" : "rgba(112, 0, 255, 0.4)",
          },
        ]}
      />

      {/* Core Button */}
      <AnimatedPressable
        onPress={() => setListening(!listening)}
        style={[
          styles.coreButton,
          {
            borderColor: listening ? borderColor : "rgba(0, 255, 85, 0.4)",
            backgroundColor: listening ? glowColor : "rgba(10, 10, 15, 0.9)",
            shadowColor: listening ? "#00FF55" : "#7000FF",
          },
        ]}
      >
        {listening ? (
          <Volume2 color="#00FF55" size={50} strokeWidth={1.5} />
        ) : (
          <Mic color="#00FF55" size={50} strokeWidth={1.5} />
        )}
      </AnimatedPressable>

      {/* Status Text */}
      <Text style={[styles.statusText, listening && styles.statusTextActive]}>
        {listening ? "LISTENING..." : "TAP TO SPEAK"}
      </Text>

      {/* AI Status */}
      <View style={styles.statusRow}>
        <View style={[styles.statusDot, { backgroundColor: "#00FF55" }]} />
        <Text style={styles.statusText2}>{aiStatus}</Text>
        <View style={[styles.statusDot, { backgroundColor: "#00F0FF" }]} />
        <Text style={styles.statusText2}>{securityLevel}</Text>
      </View>

      {/* Features Indicator */}
      <View style={styles.featuresContainer}>
        {["VOICE", "TTS", "STT", "AI"].map((feature, idx) => (
          <View key={idx} style={styles.featureChip}>
            <Sparkles color="#00FF55" size={10} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#000000",
  },
  outerRing: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 85, 0.3)",
    borderStyle: "dashed",
  },
  middleRing: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1.5,
    borderColor: "rgba(0, 240, 255, 0.3)",
  },
  innerRing: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "rgba(112, 0, 255, 0.4)",
  },
  coreButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  statusText: {
    marginTop: 30,
    fontSize: 12,
    letterSpacing: 4,
    color: "#666666",
    fontFamily: "monospace",
  },
  statusTextActive: {
    color: "#00FF55",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 15,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText2: {
    fontSize: 10,
    color: "#888888",
    fontFamily: "monospace",
  },
  featuresContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "rgba(0, 255, 85, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 85, 0.2)",
  },
  featureText: {
    fontSize: 9,
    color: "#00FF55",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
});

export default VoiceNode;