import React from "react";
import { useState } from "react";
import { api } from "../api";
import { Note } from "../types";

interface Props { note: Note; onSaved?: (n: Note) => void }

export default function UpdateNoteForm({ note, onSaved }: Props) {
  const [form, setForm] = useState({ title: note.title, content: note.content, category: note.category ?? "", published: note.published });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? (e.target as any).checked : value }));
  };

  const handleSubmit = async () => {
    const res = await api.patch(`/notes/${note.id}`, form);
    onSaved?.(res.data.note);
  };

  return (
    <div className="border p-4 rounded-lg space-y-2">
      <h2 className="font-semibold">Edit Note</h2>
      <input name="title" value={form.title} onChange={handleChange} className="border p-1 w-full" />
      <textarea name="content" value={form.content} onChange={handleChange} className="border p-1 w-full h-24" />
      <input name="category" value={form.category} onChange={handleChange} className="border p-1 w-full" />
      <label className="flex items-center gap-2">
        <input type="checkbox" name="published" checked={form.published} onChange={handleChange} /> Published
      </label>
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
    </div>
  );
}