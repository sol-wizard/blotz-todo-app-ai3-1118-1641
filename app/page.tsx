import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types/todo";

const todos: Todo[] = [
  { id: "1", title: "Watch the React video", isDone: true },
  { id: "2", title: "Build the to-do app", isDone: false },
  { id: "3", title: "Open a PR", isDone: false },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">My To-dos</h1>
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} title={todo.title} isDone={todo.isDone} />
          ))}
        </ul>
      </div>
    </main>
  );
}
