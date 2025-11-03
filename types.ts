export interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl: string;
  excerpt: string;
  content: string; // Markdown content
}

export interface User {
  id: string;
  username: string;
  password: string; // In a real app, this would be hashed
  role: 'admin' | 'user';
}