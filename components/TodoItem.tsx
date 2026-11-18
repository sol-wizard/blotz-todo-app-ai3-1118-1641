interface TodoItemProps {
  title: string;
  isDone: boolean;
  createdAt: string;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoItem({
  title,
  isDone,
  createdAt,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <input
        type="checkbox"
        checked={isDone}
        onChange={onToggle}
        className="h-4 w-4 cursor-pointer"
      />
      <span
        className={`flex-1 ${isDone ? "text-gray-400 line-through" : "text-gray-800"}`}
      >
        {title}
      </span>
      <span className="text-xs text-gray-400">{createdAt.slice(0, 10)}</span>
      <button
        onClick={onDelete}
        className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50"
      >
        Delete
      </button>
    </li>
  );
}
