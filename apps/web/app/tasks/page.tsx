import { TaskList } from "@repo/ui/task/TaskList"; // Import the shared component

export default function TasksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-6">Web Task Management</h1>
      <div className="w-full max-w-2xl">
        {/* Render the TaskList component */}
        <TaskList />
      </div>
    </main>
  );
}
