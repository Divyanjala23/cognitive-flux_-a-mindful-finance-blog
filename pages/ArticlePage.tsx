import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Article } from '../types';

// A simple markdown-to-html renderer
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const htmlContent = content
        .trim()
        .split('\n')
        .map(line => {
            if (line.startsWith('## ')) {
                return `<h2 class="text-3xl font-bold font-heading text-[var(--heading-color)] mt-10 mb-4">${line.substring(3)}</h2>`;
            }
            if (line.startsWith('### ')) {
                return `<h3 class="text-2xl font-bold font-heading text-[var(--heading-color)] mt-8 mb-3">${line.substring(4)}</h3>`;
            }
            if (line.startsWith('*   ')) {
                return `<li class="ml-8 list-disc text-[var(--text-color-muted)] mb-2">${line.substring(4)}</li>`;
            }
            if (line.trim() === '') {
                return '<br />';
            }
            return `<p class="text-[var(--text-color)] mb-4 leading-relaxed">${line}</p>`;
        })
        .join('');
    return <div className="prose-base" dangerouslySetInnerHTML={{ __html: htmlContent.replace(/<br \/>(\s*<li)/g, '$1') }} />;
};

const ArticlePage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl font-bold">Article not found</h1>
            <Link to="/articles" className="mt-4 inline-block text-emerald-400 hover:text-emerald-500">Back to articles</Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles.filter(a => a.id !== id && a.category === article.category).slice(0, 2);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="max-w-3xl mx-auto bg-[var(--card-bg)] backdrop-blur-md p-6 sm:p-12 rounded-xl border border-[var(--card-border)]">
          <header className="text-center mb-12">
            <p className="text-emerald-500 dark:text-emerald-400 font-semibold">{article.category}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading mt-2">{article.title}</h1>
            <p className="text-[var(--text-color-muted)] mt-4">{article.author} &bull; {article.date}</p>
          </header>
          
          <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-96 object-cover rounded-xl shadow-lg mb-12" />

          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={article.content} />
          </div>

          <div className="mt-16 pt-8 border-t border-[var(--card-border)]">
            <h3 className="text-2xl font-bold font-heading mb-6">Related Reads</h3>
            <div className="grid sm:grid-cols-2 gap-8">
                {relatedArticles.map(related => (
                    <Link key={related.id} to={`/article/${related.id}`} className="block group bg-black/5 dark:bg-slate-800/50 p-6 rounded-lg hover:bg-black/10 dark:hover:bg-slate-800 transition-colors">
                        <h4 className="font-bold text-[var(--heading-color)] group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">{related.title}</h4>
                        <p className="text-sm text-[var(--text-color-muted)] mt-2">{related.excerpt}</p>
                    </Link>
                ))}
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default ArticlePage;