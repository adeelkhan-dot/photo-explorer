import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdvanceStackParamList } from "./AdvanceStack";

type Nav = NativeStackNavigationProp<AdvanceStackParamList>;

export default function AdvanceScreen() {
  const navigation = useNavigation<Nav>();

  const concepts = [
    { title: "Two Modals in Parallel", screen: "ParallelModals" },
    { title: "Card Entry/Exit Animations", screen: "CardAnimations" },
    { title: "Action Sheet Animation", screen: "ActionSheet" },
    { title: "Loader Animation", screen: "Loader" },
    { title: "Shimmer Animation", screen: "Shimmer" },
    { title: "Modal With Input", screen: "InputModal" },
    { title: "Keyboard-Aware Scroll", screen: "KeyboardAware" },
    { title: "Keyboard Action Tab", screen: "KeyboardActionTab" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Advance Concepts</Text>
      {concepts.map((c) => (
        <TouchableOpacity
          key={c.screen}
          style={styles.button}
          onPress={() => navigation.navigate(c.screen)}
        >
          <Text style={styles.buttonText}>{c.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 40 },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  button: {
    padding: 18,
    borderRadius: 10,
    backgroundColor: "#007bff",
    marginBottom: 12,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
