interface TodoItemProps {
  title: string;
  isDone: boolean;
}

export default function TodoItem({ title, isDone }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <span>{isDone ? "✅" : "⬜"}</span>
      <span className={isDone ? "text-gray-400 line-through" : "text-gray-800"}>
        {title}
      </span>
    </li>
  );
}
