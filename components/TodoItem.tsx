interface TodoItemProps {
  title: string;
  isDone: boolean;
}

export default function TodoItem({ title, isDone }: TodoItemProps) {
  return (
    <li>
      {isDone ? "✅" : "⬜"} {title}
    </li>
  );
}
