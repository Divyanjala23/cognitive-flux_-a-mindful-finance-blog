import React, { useState } from 'react';
import type { Article, User } from '../types';
import { suggestTitle } from '../services/geminiService';
import ZenButton from '../components/ZenButton';

interface AdminDashboardPageProps {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  currentUser: User | null;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ articles, setArticles, currentUser }) => {
  
  const getInitialFormState = (): Omit<Article, 'id'> => ({
    title: '',
    author: currentUser?.username || 'Admin',
    date: new Date().toISOString().split('T')[0],
    category: '',
    tags: [],
    imageUrl: '',
    excerpt: '',
    content: '',
  });

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formState, setFormState] = useState<Omit<Article, 'id'>>(getInitialFormState());
  const [tagInput, setTagInput] = useState('');
  const [isSuggestingTitle, setIsSuggestingTitle] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formInputClass = "w-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-[var(--heading-color)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow";
  const fileInputClass = "block w-full text-sm text-[var(--text-color-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-900/50 dark:file:text-emerald-300 dark:hover:file:bg-emerald-900";


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormState(prev => ({...prev, imageUrl: result }));
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formState.tags.includes(newTag)) {
        setFormState(prev => ({...prev, tags: [...prev.tags, newTag]}));
      }
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormState(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const resetForm = () => {
    setFormState(getInitialFormState());
    setTagInput('');
    setEditingArticle(null);
    setIsCreating(false);
    setImagePreview(null);
  };

  const handleSuggestTitle = async () => {
    if (!formState.content) {
        alert("Please write some content first to suggest a title.");
        return;
    }
    setIsSuggestingTitle(true);
    try {
        const title = await suggestTitle(formState.content);
        setFormState(prev => ({ ...prev, title }));
    } catch (error) {
        console.error("Failed to suggest title", error);
        alert("Could not suggest a title. Please check the console for errors.");
    } finally {
        setIsSuggestingTitle(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImageUrl = formState.imageUrl || `https://picsum.photos/seed/${Date.now()}/800/400`;

    if (editingArticle) {
      const updatedArticle: Article = { ...formState, id: editingArticle.id, imageUrl: finalImageUrl };
      setArticles(articles.map(a => a.id === editingArticle.id ? updatedArticle : a));
    } else {
      const newArticle: Article = { 
        ...formState, 
        id: formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
        imageUrl: finalImageUrl,
      };
      setArticles([newArticle, ...articles]);
    }
    resetForm();
  };

  const handleEdit = (article: Article) => {
    setIsCreating(true);
    setEditingArticle(article);
    setFormState({
        title: article.title,
        author: article.author,
        date: article.date,
        category: article.category,
        tags: article.tags,
        imageUrl: article.imageUrl,
        excerpt: article.excerpt,
        content: article.content,
    });
    setImagePreview(article.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDelete = (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
        setArticles(articles.filter(a => a.id !== articleId));
    }
  };

  const formElement = (
    <div className="bg-[var(--card-bg)] backdrop-blur-lg p-8 rounded-xl border border-[var(--card-border)] mb-12">
        <h2 className="text-3xl font-bold font-heading mb-6">{editingArticle ? 'Edit Article' : 'Create New Article'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[var(--text-color)] mb-2" htmlFor="title">Title</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" id="title" name="title" value={formState.title} onChange={handleInputChange} required className={formInputClass} />
                <ZenButton type="button" onClick={handleSuggestTitle} disabled={isSuggestingTitle} className="px-4 py-2 text-sm whitespace-nowrap">
                    {isSuggestingTitle ? 'Suggesting...' : '✨ Suggest Title'}
                </ZenButton>
              </div>
            </div>
             <div>
                <label className="block text-[var(--text-color)] mb-2" htmlFor="image">Featured Image</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className={fileInputClass} />
                {imagePreview && <img src={imagePreview} alt="preview" className="mt-4 rounded-lg max-h-48 w-auto" />}
            </div>
            <div>
                <label className="block text-[var(--text-color)] mb-2" htmlFor="content">Content (Markdown)</label>
                <textarea id="content" name="content" value={formState.content} onChange={handleInputChange} required rows={10} className={formInputClass}></textarea>
            </div>
            <div>
                <label className="block text-[var(--text-color)] mb-2" htmlFor="excerpt">Excerpt</label>
                <textarea id="excerpt" name="excerpt" value={formState.excerpt} onChange={handleInputChange} required rows={3} className={formInputClass}></textarea>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[var(--text-color)] mb-2" htmlFor="author">Author</label>
                    <input type="text" id="author" name="author" value={formState.author} onChange={handleInputChange} required className={formInputClass} />
                </div>
                <div>
                    <label className="block text-[var(--text-color)] mb-2" htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" value={formState.category} onChange={handleInputChange} required className={formInputClass} />
                </div>
            </div>
             <div>
                <label className="block text-[var(--text-color)] mb-2" htmlFor="tags">Tags (press Enter to add)</label>
                <div className={`${formInputClass} flex flex-wrap items-center gap-2 py-1 h-auto`}>
                    {formState.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-md text-sm">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="font-bold text-emerald-800 dark:text-emerald-200 hover:text-red-500">&times;</button>
                        </span>
                    ))}
                    <input
                        type="text"
                        id="tags"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagKeyDown}
                        className="flex-grow bg-transparent focus:outline-none p-1"
                        placeholder="Add a tag..."
                    />
                </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={resetForm} className="px-6 py-2 rounded-full font-bold text-[var(--text-color)] bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors">Cancel</button>
                <ZenButton type="submit">{editingArticle ? 'Update Article' : 'Create Article'}</ZenButton>
            </div>
        </form>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading">Admin Dashboard</h1>
        <p className="text-[var(--text-color-muted)] mt-4 max-w-2xl mx-auto">Welcome, {currentUser?.username}. Manage your articles and content.</p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
      </div>

      {!isCreating && (
        <div className="text-center mb-12">
            <ZenButton onClick={() => { setIsCreating(true); setEditingArticle(null); setFormState(getInitialFormState()); }}>Create New Article</ZenButton>
        </div>
      )}
      
      {isCreating && formElement}

      <div className="bg-[var(--card-bg)] backdrop-blur-lg p-8 rounded-xl border border-[var(--card-border)]">
        <h2 className="text-3xl font-bold font-heading mb-6">Existing Articles</h2>
        <div className="space-y-4">
            {articles.map(article => (
                <div key={article.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 rounded-lg bg-black/5 dark:bg-slate-800/50">
                    <div>
                        <h3 className="font-bold text-[var(--heading-color)]">{article.title}</h3>
                        <p className="text-sm text-[var(--text-color-muted)]">{article.author} &bull; {article.date}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        <ZenButton onClick={() => handleEdit(article)} className="px-4 py-1 text-sm bg-blue-500 hover:bg-blue-600 hover:shadow-blue-500/40">Edit</ZenButton>
                        <ZenButton onClick={() => handleDelete(article.id)} className="px-4 py-1 text-sm bg-red-500 hover:bg-red-600 hover:shadow-red-500/40">Delete</ZenButton>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;