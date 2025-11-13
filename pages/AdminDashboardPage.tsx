import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Article, User } from '../types';
import { suggestTitle } from '../services/geminiService';
import ZenButton from '../components/ZenButton';

interface AdminDashboardPageProps {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  currentUser: User | null;
}

/**
 * AdminDashboardPage (modernized)
 * - Refined layout + typography
 * - Quick actions bar (Create, Export JSON, Import JSON)
 * - Search + filter by category + sort by date/title
 * - Inline stats
 * - Nicer editor panel with image drag & drop and live preview
 * - Tag UX polish
 * - Export single post as Markdown (.md)
 * - Import articles from JSON (merges by id)
 * - Autosave draft to localStorage while creating/editing
 */
const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ articles, setArticles, currentUser }) => {
  // ------------------ helpers ------------------
  const todayISO = new Date().toISOString().split('T')[0];
  const getInitialFormState = (): Omit<Article, 'id'> => ({
    title: '',
    author: currentUser?.username || 'Admin',
    date: todayISO,
    category: '',
    tags: [],
    imageUrl: '',
    excerpt: '',
    content: '',
  });

  // ------------------ state ------------------
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formState, setFormState] = useState<Omit<Article, 'id'>>(getInitialFormState());
  const [tagInput, setTagInput] = useState('');
  const [isSuggestingTitle, setIsSuggestingTitle] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'dateDesc' | 'dateAsc' | 'titleAsc' | 'titleDesc'>('dateDesc');

  // ------------------ classes ------------------
  const formInputClass = "w-full bg-slate-200/60 dark:bg-slate-800/60 border border-[var(--card-border)] rounded-xl px-4 py-2 text-[var(--heading-color)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow";
  const fileInputClass = "block w-full text-sm text-[var(--text-color-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-900/40 dark:file:text-emerald-300 dark:hover:file:bg-emerald-900/60";

  // ------------------ derived ------------------
  const categories = useMemo(() => {
    const set = new Set(articles.map(a => a.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [articles]);

  const filtered = useMemo(() => {
    let list = [...articles];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.tags.join(',').toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'all') {
      list = list.filter(a => a.category === categoryFilter);
    }
    switch (sortBy) {
      case 'dateAsc':
        list.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case 'titleAsc':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        list.sort((a, b) => b.date.localeCompare(a.date));
    }
    return list;
  }, [articles, search, categoryFilter, sortBy]);

  const stats = useMemo(() => ({
    total: articles.length,
    today: articles.filter(a => a.date === todayISO).length,
    categories: new Set(articles.map(a => a.category).filter(Boolean)).size,
  }), [articles]);

  // ------------------ autosave draft ------------------
  useEffect(() => {
    const key = 'admin_draft_article';
    if (isCreating) {
      localStorage.setItem(key, JSON.stringify({ formState, editingId: editingArticle?.id || null }));
    } else {
      localStorage.removeItem(key);
    }
  }, [formState, isCreating, editingArticle?.id]);

  useEffect(() => {
    const key = 'admin_draft_article';
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.formState) {
          setIsCreating(true);
          setFormState(parsed.formState);
          setImagePreview(parsed.formState.imageUrl || null);
        }
      } catch {}
    }
  }, []);

  // ------------------ handlers: form ------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFileAsDataUrl(file);
  };

  const dropRef = useRef<HTMLLabelElement | null>(null);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) readFileAsDataUrl(file);
  };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const readFileAsDataUrl = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setFormState(prev => ({ ...prev, imageUrl: result }));
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formState.tags.includes(newTag)) {
        setFormState(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setTagInput('');
    } else if (e.key === 'Backspace' && !tagInput) {
      // quick remove last tag
      setFormState(prev => ({ ...prev, tags: prev.tags.slice(0, -1) }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormState(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
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
      alert('Please write some content first to suggest a title.');
      return;
    }
    setIsSuggestingTitle(true);
    try {
      const title = await suggestTitle(formState.content);
      setFormState(prev => ({ ...prev, title }));
    } catch (error) {
      console.error('Failed to suggest title', error);
      alert('Could not suggest a title. Please check the console for errors.');
    } finally {
      setIsSuggestingTitle(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImageUrl = formState.imageUrl || `https://picsum.photos/seed/${Date.now()}/800/400`;

    if (editingArticle) {
      const updatedArticle: Article = { ...formState, id: editingArticle.id, imageUrl: finalImageUrl };
      setArticles(articles.map(a => (a.id === editingArticle.id ? updatedArticle : a)));
    } else {
      const slug = formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newArticle: Article = {
        ...formState,
        id: `${slug || 'untitled'}-${Date.now()}`,
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

  // ------------------ export / import ------------------
  const downloadFile = (filename: string, content: string, mime = 'application/octet-stream') => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAllJson = () => {
    downloadFile(`articles-${Date.now()}.json`, JSON.stringify(articles, null, 2), 'application/json');
  };

  const exportArticleMarkdown = (a: Article) => {
    const md = `---\n` +
      `title: ${a.title}\n` +
      `author: ${a.author}\n` +
      `date: ${a.date}\n` +
      `category: ${a.category}\n` +
      `tags: [${a.tags.join(', ')}]\n` +
      `image: ${a.imageUrl}\n` +
      `---\n\n` +
      `${a.excerpt ? `> ${a.excerpt}\n\n` : ''}${a.content}`;
    const safeTitle = a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'article';
    downloadFile(`${safeTitle}.md`, md, 'text/markdown');
  };

  const importJson = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Article[];
      // merge by id (overwrite existing)
      const map = new Map<string, Article>();
      articles.forEach(a => map.set(a.id, a));
      parsed.forEach(a => map.set(a.id, a));
      setArticles(Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date)));
    } catch (e) {
      alert('Import failed. Make sure the JSON structure matches Article[].');
    }
  };

  // ------------------ UI ------------------
  const formElement = (
    <div className="bg-[var(--card-bg)]/80 backdrop-blur-xl p-8 rounded-2xl border border-[var(--card-border)] mb-12 shadow-xl shadow-black/5">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-heading">{editingArticle ? 'Edit Article' : 'Create New Article'}</h2>
        <div className="text-xs text-[var(--text-color-muted)]">Drafts autosave locally</div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[var(--text-color)] mb-2" htmlFor="title">Title</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="text" id="title" name="title" value={formState.title} onChange={handleInputChange} required className={formInputClass} />
            <ZenButton type="button" onClick={handleSuggestTitle} disabled={isSuggestingTitle} className="px-4 py-2 text-sm whitespace-nowrap">
              {isSuggestingTitle ? 'Suggesting…' : '✨ Suggest Title'}
            </ZenButton>
          </div>
        </div>

        <div>
          <label className="block text-[var(--text-color)] mb-2">Featured Image</label>
          <div className="grid md:grid-cols-2 gap-4">
            <label
              ref={dropRef}
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer hover:border-emerald-400/60 text-center"
            >
              <span className="text-sm text-[var(--text-color-muted)]">Drag & drop or click to upload</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className={fileInputClass + ' hidden'} />
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="rounded-xl w-full h-48 object-cover border border-[var(--card-border)]" />
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[var(--text-color)] mb-2" htmlFor="author">Author</label>
            <input type="text" id="author" name="author" value={formState.author} onChange={handleInputChange} required className={formInputClass} />
          </div>
          <div>
            <label className="block text-[var(--text-color)] mb-2" htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={formState.date} onChange={handleInputChange} required className={formInputClass} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[var(--text-color)] mb-2" htmlFor="category">Category</label>
            <input type="text" id="category" name="category" value={formState.category} onChange={handleInputChange} required className={formInputClass} />
          </div>
          <div>
            <label className="block text-[var(--text-color)] mb-2" htmlFor="tags">Tags (press Enter)</label>
            <div className={`${formInputClass} flex flex-wrap items-center gap-2 py-1 h-auto`}>
              {formState.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-md text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="font-bold text-emerald-800 dark:text-emerald-200 hover:text-red-500">×</button>
                </span>
              ))}
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagKeyDown}
                className="flex-grow bg-transparent focus:outline-none p-1"
                placeholder="Add a tag…"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[var(--text-color)] mb-2" htmlFor="content">Content (Markdown)</label>
          <textarea id="content" name="content" value={formState.content} onChange={handleInputChange} required rows={10} className={formInputClass}></textarea>
        </div>

        <div>
          <label className="block text-[var(--text-color)] mb-2" htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" value={formState.excerpt} onChange={handleInputChange} required rows={3} className={formInputClass}></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={resetForm} className="px-6 py-2 rounded-full font-bold text-[var(--text-color)] bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors">Cancel</button>
          <ZenButton type="submit">{editingArticle ? 'Update Article' : 'Create Article'}</ZenButton>
        </div>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-heading">Admin Dashboard</h1>
            <p className="text-[var(--text-color-muted)] mt-2 max-w-2xl">Welcome, {currentUser?.username}. Manage your articles and content.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ZenButton onClick={() => { setIsCreating(true); setEditingArticle(null); setFormState(getInitialFormState()); }}>Create New</ZenButton>
            <ZenButton onClick={exportAllJson} className="bg-emerald-600 hover:bg-emerald-700">Export JSON</ZenButton>
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 cursor-pointer border border-[var(--card-border)] text-sm">
              Import JSON
              <input type="file" accept="application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) importJson(f); e.currentTarget.value=''; }} />
            </label>
          </div>
        </div>
        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <div className="text-sm text-[var(--text-color-muted)]">Total Articles</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <div className="text-sm text-[var(--text-color-muted)]">Published Today</div>
            <div className="text-2xl font-bold">{stats.today}</div>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <div className="text-sm text-[var(--text-color-muted)]">Categories</div>
            <div className="text-2xl font-bold">{stats.categories}</div>
          </div>
        </div>
      </div>

      {/* Create/Edit panel */}
      {isCreating && formElement}

      {/* List: controls */}
      <div className="bg-[var(--card-bg)]/80 backdrop-blur-xl p-6 rounded-2xl border border-[var(--card-border)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
          <h2 className="text-2xl font-bold font-heading">Existing Articles</h2>
          <div className="flex flex-wrap items-center gap-3">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, tags, author…" className={formInputClass + ' max-w-xs'} />
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={formInputClass}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className={formInputClass}>
              <option value="dateDesc">Newest first</option>
              <option value="dateAsc">Oldest first</option>
              <option value="titleAsc">Title A→Z</option>
              <option value="titleDesc">Title Z→A</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-[var(--card-border)]">
          {filtered.map(a => (
            <div key={a.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-start gap-4 min-w-0">
                <img src={a.imageUrl} alt={a.title} className="w-20 h-14 rounded-md object-cover border border-[var(--card-border)] flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-[var(--heading-color)] truncate">{a.title}</h3>
                    {a.category && <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/20">{a.category}</span>}
                  </div>
                  <p className="text-xs text-[var(--text-color-muted)] truncate">
                    {a.author} • {a.date}
                  </p>
                  {a.tags?.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {a.tags.slice(0, 4).map(t => (
                        <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[var(--card-border)]">#{t}</span>
                      ))}
                      {a.tags.length > 4 && <span className="text-[10px] text-[var(--text-color-muted)]">+{a.tags.length - 4} more</span>}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <ZenButton onClick={() => exportArticleMarkdown(a)} className="px-3 py-1 text-xs bg-emerald-600 hover:bg-emerald-700">Export .md</ZenButton>
                <ZenButton onClick={() => handleEdit(a)} className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700">Edit</ZenButton>
                <ZenButton onClick={() => handleDelete(a.id)} className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700">Delete</ZenButton>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-[var(--text-color-muted)]">No articles match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
