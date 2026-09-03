import IrisBiometricScanner from "@/components/IrisBiometricScanner";
import IrisHeader from "@/components/IrisHeader";
import IrisHolographicOrb from "@/components/IrisHolographicOrb";
import IrisNativeVisualizer from "@/components/IrisNativeVisualizer";
import IrisQuantumHUD from "@/components/IrisQuantumHUD";
import VoiceNode from "@/components/VoiceNode";
import { styled } from "nativewind";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <IrisHeader />
        <IrisHolographicOrb />
        <VoiceNode />
        <IrisBiometricScanner />
        <IrisNativeVisualizer />
        <IrisQuantumHUD />
        
        {/* Footer Status */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>IRIS-X v2.0 | ULTRA PRO | ALL FEATURES UNLOCKED</Text>
          <Text style={styles.footerSubtext}>No payment required | Free forever</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 255, 85, 0.2)",
  },
  footerText: {
    color: "#00FF55",
    fontSize: 10,
    fontFamily: "monospace",
    letterSpacing: 2,
  },
  footerSubtext: {
    color: "#666666",
    fontSize: 8,
    fontFamily: "monospace",
    letterSpacing: 1,
    marginTop: 5,
  },
});
