"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { taskSchema, TaskFormValues } from "@/lib/schema";

interface AddTaskDialogProps {
  onSave: (title: string, dueDate?: string) => Promise<void>;
}

export default function AddTaskDialog({ onSave }: AddTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", dueDate: "" },
  });

  const [saveError, setSaveError] = useState("");

  async function onSubmit(values: TaskFormValues) {
    setSaveError("");
    try {
      await onSave(values.title, values.dueDate || undefined);
      form.reset();
      setIsOpen(false);
    } catch {
      setSaveError("Could not save the task. Please try again.");
    }
  }

  return (
    <>
      <Button className="mb-4" onClick={() => setIsOpen(true)}>
        Add Task
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>New task</DialogTitle>
            </DialogHeader>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="task-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="task-title"
                    autoFocus
                    aria-invalid={fieldState.invalid}
                    placeholder="What do you need to do?"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="dueDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="task-due-date">
                    Due date (optional)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="task-due-date"
                    type="date"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {saveError && (
              <p role="alert" className="text-sm text-destructive">
                {saveError}
              </p>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
