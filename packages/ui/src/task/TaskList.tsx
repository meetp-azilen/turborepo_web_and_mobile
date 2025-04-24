"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Button } from "../button";

// --- Updated Types and Constants ---
type Task = {
  id: string;
  name: string;
  status: "To do" | "In Progress" | "QA" | "Done";
};

const statusOptions: Task["status"][] = ["To do", "In Progress", "QA", "Done"];
// --- End Updated Types and Constants ---

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");

  const addTask = () => {
    if (newTaskName.trim() === "") {
      if (Platform.OS !== "web") {
        Alert.alert("Missing Information", "Please enter a task name.");
      } else {
        console.warn("Task name missing");
      }
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      name: newTaskName,
      status: "To do",
    };
    setTasks([...tasks, newTask]);
    setNewTaskName("");
  };

  const updateTaskStatus = (id: string, status: Task["status"]) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>

      {/* Add Task Section - Simplified */}
      <View
        style={[
          styles.inputContainerBase,
          Platform.OS === "web"
            ? styles.inputContainerWeb
            : styles.inputContainerNative,
        ]}
      >
        <TextInput
          style={[styles.input, Platform.OS !== "web" && styles.inputNative]} // Native margin handled here
          value={newTaskName}
          onChangeText={setNewTaskName}
          placeholder="Enter new task"
          aria-label="New task name"
        />
        <View style={[Platform.OS !== "web" && styles.buttonContainerNative]}>
          <Button text="Add Task" onClick={addTask} />
        </View>
      </View>

      {/* Task List - Simplified */}
      <View style={styles.listContainer}>
        {tasks.length === 0 ? (
          <Text>No tasks yet!</Text>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskText}>{task.name}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

// Updated Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainerBase: {
    marginBottom: 16,
    alignItems: "stretch",
  },
  inputContainerWeb: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputContainerNative: {
    flexDirection: "column",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flexGrow: Platform.OS === "web" ? 1 : undefined,
  },
  inputNative: {
    marginBottom: 8,
  },
  listContainer: {},
  taskItem: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  taskText: {
    fontSize: 16,
    flexShrink: 1,
    marginRight: 8,
  },
  buttonContainerNative: {
    alignSelf: "flex-start",
  },
});
