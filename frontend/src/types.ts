export interface Note {
  id: string;
  title: string;
  content: string;
  category?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string | null;
}