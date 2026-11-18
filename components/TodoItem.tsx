import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemProps {
  title: string;
  isDone: boolean;
  createdAt: string;
  dueDate?: string;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoItem({
  title,
  isDone,
  createdAt,
  dueDate,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <li>
      <Card className="flex flex-row items-center gap-3 px-4 py-3">
        <Checkbox checked={isDone} onCheckedChange={onToggle} />
        <span
          className={`flex-1 ${isDone ? "text-muted-foreground line-through" : ""}`}
        >
          {title}
        </span>
        <span className="text-xs text-muted-foreground">
          {createdAt.slice(0, 10)}
        </span>
        {dueDate && (
          <span className="text-xs font-medium">Due {dueDate}</span>
        )}
        <Button variant="destructive" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </Card>
    </li>
  );
}
