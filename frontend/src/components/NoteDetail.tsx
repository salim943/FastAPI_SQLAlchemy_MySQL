import React from "react";
import { useEffect, useState } from "react";
import { api } from "../api";
import { Note } from "../types";
import UpdateNoteForm from "./UpdateNoteForm";

export default function NoteDetail({ id }: { id: string }) {
  const [note, setNote] = useState<Note | null>(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => { api.get(`api/notes/${id}`).then(res => setNote(res.data.note)); }, [id]);

  if (!note) return <p>Loading…</p>;
  if (edit) return <UpdateNoteForm note={note} onSaved={n => { setNote(n); setEdit(false); }} />;

  return (
    <div className="border p-4 rounded-lg space-y-1">
      <h3 className="text-lg font-medium">{note.title}</h3>
      <p>{note.content}</p>
      <p className="text-sm text-gray-500">{note.category}</p>
      <button onClick={() => setEdit(true)} className="text-blue-600 underline mt-2">Edit</button>
    </div>
  );
}