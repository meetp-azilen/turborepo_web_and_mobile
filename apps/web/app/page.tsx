"use client";

import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";

import styles from "../styles/index.module.css";

export default function Web() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button onClick={() => router.push("/tasks")} text="Task Manager" />
    </div>
  );
}
