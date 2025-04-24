import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TaskList } from "@repo/ui/TaskList"; // Import shared component using alias

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      {/* Optionally add a screen title */}
      {/* <Text style={styles.title}>Tasks</Text> */}
      <TaskList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add padding or other container styles if needed
    // padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});
