import React from "react";
import NotesList from "./components/NotesList";
import CreateNoteForm from "./components/CreateNoteForm";

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <CreateNoteForm />
      <NotesList />
    </div>
  );
}