"use client";

import React, { useState, useEffect } from "react"; // Import useEffect
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { Button } from "./button";

// --- Types and Constants ---
type Task = {
  id: string;
  name: string;
  status: "To do" | "In Progress" | "QA" | "Done";
};

const statusOptions: Task["status"][] = ["To do", "In Progress", "QA", "Done"];
const TASKS_STORAGE_KEY = "My_tasks"; // Key for storage
// --- End Types and Constants ---

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Load tasks from storage on mount
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        let storedTasks = null;
        if (Platform.OS === "web") {
          storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
        } else {
          storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        }

        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Failed to load tasks from storage", error);
        // Optionally show feedback to user
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save tasks to storage whenever the tasks state changes
  useEffect(() => {
    // Don't save during initial load
    if (isLoading) return;

    const saveTasks = async () => {
      try {
        const tasksJson = JSON.stringify(tasks);
        if (Platform.OS === "web") {
          localStorage.setItem(TASKS_STORAGE_KEY, tasksJson);
        } else {
          await AsyncStorage.setItem(TASKS_STORAGE_KEY, tasksJson);
        }
      } catch (error) {
        console.error("Failed to save tasks to storage", error);
        // Optionally show feedback to user
      }
    };

    saveTasks();
  }, [tasks, isLoading]); // Run whenever tasks or isLoading changes

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
    // Prepend new task for better UX
    setTasks([newTask, ...tasks]);
    setNewTaskName("");
  };

  const updateTaskStatus = (id: string, status: Task["status"]) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  // Optional: Add a delete function
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Display loading indicator or message
  if (isLoading) {
    return (
      <View style={styles.centeredMessage}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>

      {/* Add Task Section */}
      <View
        style={[
          styles.inputContainerBase,
          Platform.OS === "web"
            ? styles.inputContainerWeb
            : styles.inputContainerNative,
        ]}
      >
        <TextInput
          style={[styles.input, Platform.OS !== "web" && styles.inputNative]}
          value={newTaskName}
          onChangeText={setNewTaskName}
          placeholder="Enter new task"
          aria-label="New task name"
        />
        <View style={[Platform.OS !== "web" && styles.buttonContainerNative]}>
          <Button text="Add Task" onClick={addTask} />
        </View>
      </View>

      {/* Task List */}
      <View style={styles.listContainer}>
        {tasks.length === 0 ? (
          <Text style={styles.centeredMessage}>
            No tasks yet! Add one above.
          </Text>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskText}>{task.name}</Text>
              {/* Optional: Add a delete button */}
              {/* <Button text="Delete" onClick={() => deleteTask(task.id)} /> */}
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
  centeredMessage: {
    flex: 1, // Needed for ScrollView content
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
