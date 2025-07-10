import React from "react";
import { useState } from "react";
import { api } from "../api";
import { Note } from "../types";

interface Props { onCreated?: (n: Note) => void }

export default function CreateNoteForm({ onCreated }: Props) {
  const [form, setForm] = useState({ title: "", content: "", category: "", published: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? (e.target as any).checked : value }));
  };

  const handleSubmit = async () => {
    const res = await api.post("/api/notes", form);
    onCreated?.(res.data.note);
    setForm({ title: "", content: "", category: "", published: true });
  };

  return (
    <div className="border p-4 rounded-lg space-y-2">
      <h2 className="font-semibold">Create Note</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-1 w-full" />
      <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} className="border p-1 w-full h-24" />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-1 w-full" />
      <label className="flex gap-2 items-center">
        <input type="checkbox" name="published" checked={form.published} onChange={handleChange} /> Published
      </label>
      <button onClick={handleSubmit} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
    </div>
  );
}