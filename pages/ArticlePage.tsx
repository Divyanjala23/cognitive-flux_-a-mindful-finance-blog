import React from "react";
import { useParams, Link } from "react-router-dom";
import type { Article } from "../types";

/* ---- Minimal Markdown renderer (keeps your styling) ---- */
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const html = (content || "")
    .trim()
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) {
        return `<h2 class="text-3xl font-bold font-heading mt-10 mb-4" style="color: var(--c0)">${line.slice(3)}</h2>`;
      }
      if (line.startsWith("### ")) {
        return `<h3 class="text-2xl font-bold font-heading mt-8 mb-3" style="color: var(--c0)">${line.slice(4)}</h3>`;
      }
      if (line.startsWith("*   ")) {
        return `<li class="ml-8 list-disc mb-2" style="color: var(--text-color-muted)">${line.slice(4)}</li>`;
      }
      if (line.trim() === "") return "<br />";
      return `<p class="mb-4 leading-relaxed" style="color: var(--text-color-base)">${line}</p>`;
    })
    .join("")
    .replace(/<br \/>(\s*<li)/g, "$1");

  return <div className="prose-base" dangerouslySetInnerHTML={{ __html: html }} />;
};

const ArticlePage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => String(a.id) === String(id));

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Article not found</h1>
          <Link
            to="/articles"
            className="mt-4 inline-block text-emerald-400 hover:text-emerald-500"
          >
            Back to articles
          </Link>
        </div>
      </div>
    );
  }

  const related = articles
    .filter((a) => String(a.id) !== String(id) && a.category === article.category)
    .slice(0, 2);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back button */}
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border border-[var(--card-border)] bg-[color-mix(in_oklab,var(--c0)_8%,transparent)] text-[var(--c0)] hover:brightness-110 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Insights
        </Link>
      </div>

      {/* Main article card — mirrors your card/glass design */}
      <article className="modern-card relative max-w-3xl mx-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl p-1 shadow-lg">
        {/* subtle gradient glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: "radial-gradient(circle at center, var(--g0), transparent 70%)" }}
        />
        <div className="relative z-10 rounded-2xl p-6 sm:p-10">
          {/* category + title + meta */}
          <div className="text-center mb-8">
            <p className="text-xs font-medium" style={{ color: "var(--c0)" }}>
              {article.category}
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold font-heading">
              {article.title}
            </h1>
            <p className="text-[var(--text-color-muted)] mt-4">
              {article.author} &bull; {article.date}
            </p>
          </div>

          {/* cover image */}
          <div className="rounded-xl overflow-hidden shadow-xl mb-8">
            <img
              className="w-full h-auto max-h-96 object-cover"
              src={article.imageUrl}
              alt={article.title}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/1200x600/0E294E/FFFFFF?text=Article+Image";
              }}
            />
          </div>

          {/* content */}
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={article.content || ""} />
          </div>

          {/* footer meta bar (mirrors card footer) */}
          <div className="mt-8 pt-4 border-t border-[var(--card-border)]/50 flex items-center">
            <p className="text-xs text-[var(--text-color-muted)]">
              By {article.author} on {article.date}
            </p>
          </div>
        </div>
      </article>

      {/* Related reads — mini versions of your card design */}
      {related.length > 0 && (
        <div className="max-w-4xl mx-auto mt-14">
          <h3 className="text-2xl font-bold font-heading mb-6">Related Reads</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/article/${r.id}`}
                className="group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl p-1 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
                  style={{ background: "radial-gradient(circle at center, var(--g0), transparent 70%)" }}
                />
                <div className="relative z-10 p-4 flex gap-4">
                  <img
                    src={r.imageUrl}
                    alt={r.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/400x240/0E294E/FFFFFF?text=Image";
                    }}
                    className="h-24 w-32 object-cover rounded-xl shadow-md flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium" style={{ color: "var(--c0)" }}>
                      {r.category}
                    </p>
                    <h4 className="mt-1 font-semibold leading-snug group-hover:underline">
                      {r.title}
                    </h4>
                    <p className="mt-1 text-sm text-[var(--text-color-muted)] line-clamp-2">
                      {r.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
