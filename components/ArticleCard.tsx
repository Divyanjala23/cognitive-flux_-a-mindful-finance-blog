
// -----------------------------------------------
// ArticleCard – refreshed card style
// -----------------------------------------------
import { Link } from 'react-router-dom';

export const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl">
      <div className="bg-[var(--card-bg)] rounded-2xl overflow-hidden h-full flex flex-col border border-[var(--card-border)] transition-all duration-300 ease-out hover:border-emerald-400/60 hover:shadow-xl hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-600 backdrop-blur-md border border-emerald-500/20">
            {article.category}
          </span>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg sm:text-xl font-bold font-heading text-[var(--heading-color)] mb-1.5 group-hover:text-emerald-500 transition-colors">
            {article.title}
          </h3>
          <p className="text-[var(--text-color-muted)] text-sm line-clamp-3 flex-grow">{article.excerpt}</p>
          <div className="text-[11px] text-slate-500 mt-4 pt-4 border-t border-[var(--card-border)]">
            <span>{article.author} • {article.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
