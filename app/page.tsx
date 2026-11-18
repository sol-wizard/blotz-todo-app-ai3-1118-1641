import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types/todo";

const todos: Todo[] = [
  { id: "1", title: "Watch the React video", isDone: true },
  { id: "2", title: "Build the to-do app", isDone: false },
  { id: "3", title: "Open a PR", isDone: false },
];

export default function Home() {
  return (
    <main>
      <h1>My To-dos</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} title={todo.title} isDone={todo.isDone} />
        ))}
      </ul>
    </main>
  );
}
