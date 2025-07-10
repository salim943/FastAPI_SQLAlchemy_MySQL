import React from "react";
import { api } from "../api";

interface Props { id: string; onDeleted?: () => void }

export default function DeleteNoteButton({ id, onDeleted }: Props) {
  const handleDelete = async () => {
    if (!confirm("Delete this note?")) return;
    await api.delete(`api/notes/${id}`);
    onDeleted?.();
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline">Delete</button>
  );
}