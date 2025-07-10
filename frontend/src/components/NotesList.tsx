import React from "react";
import { useEffect, useState } from "react";
import { api } from "../api";
import { Note } from "../types";
import DeleteNoteButton from "./DeleteNoteButton";
import NoteDetail from "./NoteDetail";

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Note | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    const res = await api.get("/api/notes");
    setNotes(res.data.notes);
    setLoading(false);
  };

  useEffect(() => { fetchNotes(); }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Notes</h2>
      <ul className="space-y-1">
        {notes.map(n => (
          <li key={n.id} className="flex items-center gap-2">
            <button onClick={() => setSelected(n)} className="underline text-blue-600">{n.title}</button>
            <DeleteNoteButton id={n.id} onDeleted={fetchNotes} />
          </li>
        ))}
      </ul>
      {selected && (
        <div className="mt-4">
          <NoteDetail id={selected.id} />
        </div>
      )}
    </>
  );
}