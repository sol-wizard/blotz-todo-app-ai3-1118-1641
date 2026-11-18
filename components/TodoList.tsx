"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import AddTaskDialog from "@/components/AddTaskDialog";
import TodoItem from "@/components/TodoItem";
import { addTodo, deleteTodo, getAllTodos, updateTodo } from "@/lib/api";
import { Todo } from "@/types/todo";

export default function TodoList() {
  const queryClient = useQueryClient();
  const {
    data: todos = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  const addMutation = useMutation({
    mutationFn: ({ title, dueDate }: { title: string; dueDate?: string }) =>
      addTodo(title, dueDate),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  async function handleAdd(title: string, dueDate?: string) {
    await addMutation.mutateAsync({ title, dueDate });
  }

  const toggleMutation = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo.id, !todo.isDone),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  function handleToggle(todo: Todo) {
    toggleMutation.mutate(todo);
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id);
  }

  return (
    <>
      <AddTaskDialog onSave={handleAdd} />
      {isPending && <p className="text-gray-500">Loading tasks...</p>}
      {isError && (
        <p role="alert" className="text-red-600">
          Could not load tasks. Is the server running?
        </p>
      )}
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            isDone={todo.isDone}
            createdAt={todo.createdAt}
            dueDate={todo.dueDate}
            onToggle={() => handleToggle(todo)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </ul>
    </>
  );
}
