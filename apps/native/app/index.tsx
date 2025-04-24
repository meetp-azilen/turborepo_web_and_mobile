import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@repo/ui";
import React from "react";
import { useRouter } from "expo-router";

export default function Native() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Native</Text>
      <Button onClick={() => router.push("/tasks")} text="Task Manager" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
});
