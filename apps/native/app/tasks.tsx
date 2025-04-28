import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { TaskList } from "@repo/ui/task/TaskList"; // Import shared component using alias

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      {/* Optionally add a screen title */}
      {Platform.OS === "web" && (
        <Text style={styles.title}>Native Web Task Management</Text>
      )}
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
