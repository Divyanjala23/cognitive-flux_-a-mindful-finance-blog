import React, { useState } from 'react';

// ===================== TYPES =====================

type Article = {
  id: number | string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  category: 'Finance' | 'Mindfulness' | 'Tech';
  content: string;
};

// ===================== MARKDOWN RENDERER =====================

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const styleHeader = `style="color: var(--c0)"`;
  const styleText = `style="color: var(--text-color-base)"`;
  const styleMuted = `style="color: var(--text-color-muted)"`;

  const htmlContent = (content || '')
    .trim()
    .split('\n')
    .map((line) => {
      if (line.startsWith('## ')) {
        return `<h2 class="text-3xl font-bold font-heading mt-10 mb-4" ${styleHeader}>${line.substring(
          3
        )}</h2>`;
      }
      if (line.startsWith('### ')) {
        return `<h3 class="text-2xl font-bold font-heading mt-8 mb-3" ${styleHeader}>${line.substring(
          4
        )}</h3>`;
      }
      if (line.startsWith('*   ')) {
        return `<li class="ml-8 list-disc mb-2" ${styleMuted}>${line.substring(
          4
        )}</li>`;
      }
      if (line.trim() === '') {
        return '<br />';
      }
      return `<p class="mb-4 leading-relaxed" ${styleText}>${line}</p>`;
    })
    .join('');

  return (
    <div
      className="prose-base"
      dangerouslySetInnerHTML={{
        __html: htmlContent.replace(/<br \/>(\s*<li)/g, '$1'),
      }}
    />
  );
};

// ===================== MOCK ARTICLES =====================

const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'The Neurobiology of Debt: How Stress Impacts Spending',
    excerpt:
      'Exploring the psychological toll of financial instability and techniques for mindful money management.',
    date: 'Oct 28, 2025',
    author: 'Jane Doe',
    imageUrl:
      'https://images.unsplash.com/photo-1549646405-b77876a3809e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'Mindfulness',
    content: `
      ## The Stress-Spending Cycle
      
      Financial stress doesn't just impact your wallet; it profoundly changes your brain chemistry. The constant anxiety triggers the release of cortisol, which is linked to impulsive decision-making.

      ### Techniques for Mindful Management

      Mindfulness provides tools to interrupt this cycle. By practicing conscious awareness, we can create a delay between the impulse (stress) and the action (spending).

      *   **The 10-Second Pause:** Before any non-essential purchase, take 10 seconds to name the emotion driving the desire.
      *   **Budgeting as Meditation:** View your monthly budget as a focused, disciplined practice, not a punitive chore.
      *   **Digital Detox:** Minimize exposure to consumer-driven content to reduce external triggers.
      
      By integrating mindful practices, investors can move beyond emotional bias and build a truly resilient portfolio.
    `,
  },
  {
    id: 2,
    title: 'AI-Driven Portfolio Optimization for the Emotionally Aware Investor',
    excerpt:
      'Using machine learning to eliminate human bias and maintain a disciplined, long-term investment strategy.',
    date: 'Oct 25, 2025',
    author: 'Alex Kim',
    imageUrl:
      'https://images.unsplash.com/photo-1698207907572-cfc3a1b8c8c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'Tech',
    content: `
      ## Algorithmic Clarity
      
      AI offers an unemotional lens on market data, bypassing human biases like fear of loss or herd mentality. This leads to **disciplined, predictable returns**.

      ### The Role of Emotional Intelligence

      While AI handles the data, the emotionally aware investor understands *when* to adjust the AI's parameters, not just *what* the AI suggests.

      *   **Defining Risk:** Your personal tolerance for risk is a human factor AI cannot replace.
      *   **Long-Term Vision:** AI models thrive on long-term, stable parameters set by a clear-headed investor.
    `,
  },
  {
    id: 3,
    title: 'Compounding Clarity: Understanding the Power of Focused Growth',
    excerpt:
      'Financial growth mirrors mental growth. We break down simple, focused strategies for wealth building.',
    date: 'Oct 20, 2025',
    author: 'Sam Rivera',
    imageUrl:
      'https://images.unsplash.com/photo-1579621970588-a35d0e7ab99b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'Finance',
    content: `
      ## The Two Sides of Compounding

      The concept of compounding interest is well known, but far less understood is **compounding clarity**—the mental process of iterative learning.

      ### Focused Financial Strategies

      The goal isn't huge, sudden gains, but consistent, focused effort.

      *   **Automate Everything:** Reduce mental friction by automating savings and investments.
      *   **Review Annually, Not Daily:** Avoid the emotional rollercoaster of daily market noise.
      *   **Debt Management:** Treat high-interest debt reduction as the ultimate guaranteed return.
    `,
  },
  {
    id: 4,
    title: 'Behavioral Finance: The 5 Traps to Avoid',
    excerpt:
      'A deep dive into common cognitive biases that sabotage investment returns.',
    date: 'Oct 15, 2025',
    author: 'Jane Doe',
    imageUrl:
      'https://images.unsplash.com/photo-1590283626274-1ed28a2a0a20?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'Finance',
    content: `
      ## The Cognitive Minefield
      
      Behavioral finance studies the influence of psychology on investor and analyst behavior. Our brains are wired for survival, not for optimal capital allocation.

      ### Top 5 Biases to Recognize

      Awareness is the first step to avoiding these common pitfalls:

      *   **Hindsight Bias:** Believing past events were predictable after they've occurred ("I knew it all along!").
      *   **Anchoring:** Relying too heavily on the first piece of information offered.
      *   **Loss Aversion:** The psychological pain of a loss is twice as powerful as the pleasure of a gain.
      *   **Confirmation Bias:** Seeking out information that confirms existing beliefs.
      *   **Herding:** Following the actions of a larger group, even against your better judgment.
    `,
  },
];

// ===================== CORE UI COMPONENTS =====================

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const navigate = React.useContext(NavigationContext);

  return (
    <div
      className="flex flex-col h-full rounded-2xl p-6 bg-[var(--card-bg)]/60 cursor-pointer"
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <div className="flex-shrink-0">
        <img
          className="h-40 w-full object-cover rounded-xl mb-4 shadow-xl"
          src={article.imageUrl}
          alt={article.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://placehold.co/600x400/0E294E/FFFFFF?text=Article+Image';
          }}
        />
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium" style={{ color: 'var(--c0)' }}>
          {article.category}
        </p>
        <h3 className="mt-2 text-xl font-bold leading-snug group-hover:text-white/90">
          <span className="hover:underline">{article.title}</span>
        </h3>
        <p className="mt-3 text-sm text-[var(--text-color-muted)]/80">
          {article.excerpt}
        </p>
      </div>
      <div className="mt-6 flex items-center pt-4 border-t border-[var(--card-border)]/50">
        <p className="text-xs text-[var(--text-color-muted)]">
          By {article.author} on {article.date}
        </p>
      </div>
    </div>
  );
};

// ===================== MOCK ROUTING =====================

const NavigationContext = React.createContext<(path: string) => void>(() => {});

const Link: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  const navigate = React.useContext(NavigationContext);
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      className="cursor-pointer"
    >
      {children}
    </a>
  );
};

// ===================== ARTICLE PAGES =====================

const ArticlesPage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const navigate = React.useContext(NavigationContext);
  const backBtn = useReveal<HTMLDivElement>();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 cool-cycle">
      <div
        ref={backBtn.ref}
        className={[
          'transition-all duration-700 ease-out mb-10',
          backBtn.visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5',
        ].join(' ')}
      >
        <ModernGhostButton onClick={() => navigate('/')}>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </ModernGhostButton>
      </div>

      <h1
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{ color: 'var(--c0)' }}
      >
        All Financial & Mindful Insights
      </h1>
      <p className="text-sm text-[var(--text-color-muted)] mb-8">
        Season 01 • Behavioral finance, AI leverage, and inner stillness.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, i) => (
          <div
            key={article.id}
            className="transition-all duration-700 ease-out"
            style={{
              animation: backBtn.visible
                ? `fadeInUp 0.6s ease-out ${0.1 + i * 0.05}s both`
                : 'none',
            }}
          >
            <Tilt>
              <div className="modern-card group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl p-1 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
                  style={{
                    background:
                      'radial-gradient(circle at center, var(--g0), transparent 70%)',
                  }}
                />
                <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <ArticleCard article={article} />
                </div>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArticlePage: React.FC<{ articles: Article[]; id: number | string }> = ({
  articles,
  id,
}) => {
  const navigate = React.useContext(NavigationContext);
  const article = articles.find((a) => String(a.id) === String(id));

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center cool-cycle">
        <div className="text-center">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--c0)' }}>
            Article not found
          </h1>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/articles');
            }}
            className="mt-4 inline-block hover:underline"
            style={{ color: 'var(--c0)' }}
          >
            Back to articles
          </a>
        </div>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(
      (a) =>
        String(a.id) !== String(id) && a.category === article.category
    )
    .slice(0, 2);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 cool-cycle">
      <article className="max-w-3xl mx-auto bg-[var(--card-bg)] backdrop-blur-md p-6 sm:p-12 rounded-xl border border-[var(--card-border)]">
        <div className="mb-8">
          <ModernGhostButton onClick={() => navigate('/articles')}>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Insights
          </ModernGhostButton>
        </div>

        <header className="text-center mb-12">
          <p className="font-semibold" style={{ color: 'var(--c0)' }}>
            {article.category}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mt-2">
            {article.title}
          </h1>
          <p className="text-[var(--text-color-muted)] mt-4">
            {article.author} &bull; {article.date}
          </p>
          <p className="text-[10px] text-[var(--text-color-muted)] mt-2">
            Educational perspectives only. Not individual financial advice.
          </p>
        </header>

        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto max-h-96 object-cover rounded-xl shadow-lg mb-12"
          loading="lazy"
        />

        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={article.content} />
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--card-border)]">
          <h3 className="text-2xl font-bold font-heading mb-6">
            Related Reads
          </h3>
          <div className="grid sm:grid-cols-2 gap-8">
            {relatedArticles.map((related) => (
              <a
                key={related.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/article/${related.id}`);
                }}
                className="block group bg-black/5 p-6 rounded-lg transition-colors border border-transparent hover:border-[var(--c0)]/50"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                }}
              >
                <h4
                  className="font-bold transition-colors group-hover:underline"
                  style={{
                    color: 'var(--text-color-base)',
                    transition: 'color 0.3s ease-in-out',
                  }}
                >
                  {related.title}
                </h4>
                <p className="text-sm text-[var(--text-color-muted)] mt-2">
                  {related.excerpt}
                </p>
              </a>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

// ===================== ICONS / UTILITIES =====================

const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 9a7 7 0 0114 0v2a7 7 0 01-14 0V9z"
    />
    <circle cx="9" cy="10" r="1" />
    <circle cx="15" cy="10" r="1" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 14c1.5 1 3.5 1 5 0"
    />
  </svg>
);

// ===================== MOCK LOGIN =====================

const LoginPage: React.FC<{ onLogin: (u: string, p: string) => boolean }> = ({
  onLogin,
}) => {
  const navigate = React.useContext(NavigationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid mock credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-color)] cool-cycle">
      <div className="w-full max-w-md bg-[var(--card-bg)]/80 backdrop-blur-lg rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl">
        <div className="text-center mb-8">
          <BrainCircuitIcon
            className="h-16 w-16 mx-auto transition-colors"
            style={{
              color: 'var(--c0)',
              filter: 'drop-shadow(0 0 5px var(--g0))',
            }}
          />
          <h1 className="text-3xl font-bold text-[var(--text-color-base)] font-heading mt-4">
            Login
          </h1>
          <p className="text-[var(--text-color-muted)]">
            Access your Cognitive Flux account.
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-[var(--text-color-muted)] mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[var(--card-bg)] border rounded-lg px-4 py-2 text-[var(--text-color-base)] transition-shadow duration-300"
              style={{
                borderColor: 'var(--card-border)',
                boxShadow: '0 0 0 1px transparent',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--c0)';
                e.currentTarget.style.boxShadow =
                  '0 0 0 2px var(--c2), 0 0 10px var(--g0)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.boxShadow =
                  '0 0 0 1px transparent';
              }}
              placeholder="e.g. jane"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-[var(--text-color-muted)] mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--card-bg)] border rounded-lg px-4 py-2 text-[var(--text-color-base)] transition-shadow duration-300"
              style={{
                borderColor: 'var(--card-border)',
                boxShadow: '0 0 0 1px transparent',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--c0)';
                e.currentTarget.style.boxShadow =
                  '0 0 0 2px var(--c2), 0 0 10px var(--g0)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.boxShadow =
                  '0 0 0 1px transparent';
              }}
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <ModernButton type="submit" className="w-full">
            Login
          </ModernButton>
        </form>
        <p className="text-center text-[var(--text-color-muted)] mt-6">
          Don't have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
            className="font-semibold transition-colors hover:brightness-125"
            style={{ color: 'var(--c0)' }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

// ===================== COLOR / MOTION ENGINE =====================

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return prefersReducedMotion;
};

const HueStyle: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <style>{`
      @property --h { syntax: '<number>'; inherits: true; initial-value: 190; }

      :root {
        --h: ${prefersReducedMotion ? 200 : 190};
        --c0: hsl(var(--h) 85% 50%);
        --c1: hsl(calc(var(--h) + 20) 80% 55%);
        --c2: hsl(calc(var(--h) + 40) 75% 58%);
        --c3: hsl(calc(var(--h) + 70) 70% 62%);
        --g0: hsl(var(--h) 85% 50% / 0.16);
        --g1: hsl(calc(var(--h) + 40) 75% 58% / 0.12);

        --bg-color: hsl(220 20% 10%);
        --card-bg: hsl(222 47% 11%);
        --card-border: hsl(215 25% 26%);
        --text-color-muted: hsl(215 20% 70%);
        --text-color-base: hsl(210 40% 98%);
      }

      body {
        background-color: var(--bg-color);
        color: var(--text-color-base);
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      }

      @keyframes coolHue { from { --h: 160; } to { --h: 260; } }
      ${
        !prefersReducedMotion
          ? `.cool-cycle { animation: coolHue 28s ease-in-out infinite alternate; }`
          : ''
      }

      @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

      .btn-hueshift {
        background: linear-gradient(135deg, var(--c0), var(--c2));
        color: white;
        border: 1px solid color-mix(in oklab, var(--c0) 40%, transparent);
        box-shadow: 0 4px 20px color-mix(in oklab, var(--c0) 20%, transparent);
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(10px);
      }
      .btn-hueshift::before {
        content: '';
        position: absolute;
        top: 0; left: -100%; right: 0; bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
        animation: shimmer 3s infinite;
      }
      .btn-hueshift:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px color-mix(in oklab, var(--c0) 30%, transparent);
      }

      .btn-ghost-hueshift {
        background: color-mix(in oklab, var(--c0) 8%, transparent);
        color: var(--c0);
        border: 1px solid color-mix(in oklab, var(--c0) 30%, transparent);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
      }
      .btn-ghost-hueshift::before {
        content: '';
        position: absolute;
        inset: 0;
        background: color-mix(in oklab, var(--c0) 15%, transparent);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s ease;
      }
      .btn-ghost-hueshift:hover::before {
        transform: scaleX(1);
      }
      .btn-ghost-hueshift:hover {
        border-color: var(--c0);
        transform: translateY(-2px) scale(1.02);
      }
      .btn-ghost-hueshift > * {
        position: relative;
        z-index: 1;
      }

      .modern-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .modern-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg, var(--c0), var(--c2), var(--c3));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .modern-card:hover::before {
        opacity: 1;
      }

      .no-scrollbar {
        scrollbar-width: none;
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          animation: none !important;
        }
      }
    `}</style>
  );
};

function useReveal<T extends HTMLElement>(
  opts: IntersectionObserverInit = { threshold: 0.1 }
) {
  const ref = React.useRef<T | null>(null);
  const [visible, setVisible] = React.useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      opts
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts, prefersReducedMotion]);

  React.useLayoutEffect(() => {
    if (prefersReducedMotion) setVisible(true);
  }, [prefersReducedMotion]);

  return { ref, visible };
}

function Tilt({
  children,
  maxTilt = 5,
}: {
  children: React.ReactNode;
  maxTilt?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [{ rx, ry }, setTilt] = React.useState({ rx: 0, ry: 0 });

  if (prefersReducedMotion) return <div>{children}</div>;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      ry: (px - 0.5) * (maxTilt * 2),
      rx: -(py - 0.5) * (maxTilt * 2),
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      className="transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`,
      }}
    >
      {children}
    </div>
  );
}

function FinancialBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const coolCycleClass = prefersReducedMotion ? '' : 'cool-cycle';

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${coolCycleClass}`}
    >
      <div
        className="absolute top-[15%] left-[10%] w-[500px] h-[500px] blur-[140px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--g0), transparent 70%)',
          animation: prefersReducedMotion
            ? 'none'
            : 'float 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] blur-[180px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--g1), transparent 70%)',
          animation: prefersReducedMotion
            ? 'none'
            : 'float 22s ease-in-out 4s infinite',
        }}
      />
    </div>
  );
}

function FinancialMandala() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto mt-16 flex w-full max-w-[560px] flex-col items-center justify-center cool-cycle">
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle at center, var(--g0), transparent 70%)',
        }}
      />
      <svg
        viewBox="0 0 200 200"
        className="relative w-full max-w-xs"
        style={{
          animation: prefersReducedMotion
            ? 'none'
            : 'float 14s ease-in-out infinite',
        }}
      >
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="var(--c0)"
          strokeOpacity="0.18"
        />
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="none"
          stroke="var(--c2)"
          strokeOpacity="0.22"
        />
        <circle
          cx="100"
          cy="100"
          r="22"
          fill="var(--c0)"
          fillOpacity="0.12"
        />
        {/* Outer orbits - markets / noise */}
        {[0, 72, 144].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 65 * Math.cos(rad);
          const y = 100 + 65 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="var(--c3)"
              fillOpacity="0.6"
            />
          );
        })}
        {/* Inner nodes - principles */}
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 35 * Math.cos(rad);
          const y = 100 + 35 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="var(--c1)"
              fillOpacity="0.8"
            />
          );
        })}
        <text
          x="100"
          y="103"
          textAnchor="middle"
          fontSize="7"
          fill="var(--text-color-base)"
          fillOpacity="0.9"
        >
          calm &gt; chaos
        </text>
      </svg>
      <p className="mt-3 text-[9px] text-[var(--text-color-muted)] text-center max-w-xs">
        Outer chaos (markets, news). Inner clarity (systems, mind). Cognitive
        Flux sits in the center.
      </p>
    </div>
  );
}

function ModernButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className = '', children, ...rest } = props;
  return (
    <button
      {...rest}
      className={`cool-cycle btn-hueshift inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

function ModernGhostButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className = '', children, ...rest } = props;
  return (
    <button
      {...rest}
      className={`cool-cycle btn-ghost-hueshift inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

// ===================== HOMEPAGE SUB-SECTIONS =====================

// 1) Featured Today

const FeaturedToday: React.FC<{ article: Article }> = ({ article }) => {
  const navigate = React.useContext(NavigationContext);

  const pillText =
    article.category === 'Finance'
      ? 'Wealth Engine'
      : article.category === 'Tech'
      ? 'Future Stack'
      : 'Mind x Money';

  return (
    <section className="mt-10">
      <div className="max-w-5xl mx-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/85 backdrop-blur-xl p-1 shadow-lg modern-card">
        <div className="relative overflow-hidden rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row gap-6 items-start">
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
            style={{
              background:
                'radial-gradient(circle at top, var(--g0), transparent 70%)',
            }}
          />
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 text-[10px]">
              <span
                className="px-2 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(19, 194, 194, 0.08)',
                  color: 'var(--c0)',
                  border: '1px solid rgba(19, 194, 194, 0.35)',
                }}
              >
                Featured Today
              </span>
              <span className="text-[var(--text-color-muted)]">
                {pillText}
              </span>
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold leading-snug">
              {article.title}
            </h2>
            <p className="mt-3 text-sm text-[var(--text-color-muted)]">
              {article.excerpt}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[9px] text-[var(--text-color-muted)]">
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.category}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[9px] text-[var(--text-color-muted)]">
              <span>• Stress-aware decision making</span>
              <span>• Nervous-system safe money habits</span>
            </div>
            <div className="mt-5">
              <ModernGhostButton
                onClick={() => navigate(`/article/${article.id}`)}
              >
                Read this insight
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </ModernGhostButton>
            </div>
          </div>
          <div className="relative z-10 w-full sm:w-56 h-40 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// 2) Why Cognitive Flux

const WhyCognitiveFluxSection: React.FC = () => (
  <section className="mt-20">
    <div className="max-w-5xl mx-auto text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        Why Cognitive Flux Exists
      </h2>
      <p className="text-sm md:text-base text-[var(--text-color-muted)] max-w-2xl mx-auto">
        A signal-only publication at the intersection of{' '}
        <span className="text-[var(--c0)]">wealth</span>,{' '}
        <span className="text-[var(--c0)]">mindfulness</span>, and{' '}
        <span className="text-[var(--c0)]">AI leverage</span>—for builders who
        hate generic advice.
      </p>
    </div>
    <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
      <div className="modern-card relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-4 text-left">
        <p className="text-[10px] font-semibold text-[var(--c0)]">
          The Wealth Engine
        </p>
        <h3 className="mt-2 text-base font-semibold">
          Evidence-based money frameworks
        </h3>
        <p className="mt-2 text-xs text-[var(--text-color-muted)]">
          Systems for asymmetric upside, calm cashflow, and sane risk—not
          lottery-ticket thinking.
        </p>
        <p className="mt-3 text-[9px] text-[var(--text-color-muted)]">
          This means you stop winging it with money.
        </p>
      </div>
      <div className="modern-card relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-4 text-left">
        <p className="text-[10px] font-semibold text-[var(--c0)]">
          The Future Stack
        </p>
        <h3 className="mt-2 text-base font-semibold">
          AI as your unfair advantage
        </h3>
        <p className="mt-2 text-xs text-[var(--text-color-muted)]">
          Use AI to compress research, automate grunt work, and sharpen
          judgment—without drowning in tools.
        </p>
        <p className="mt-3 text-[9px] text-[var(--text-color-muted)]">
          This means you stop being overwhelmed by tech.
        </p>
      </div>
      <div className="modern-card relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-4 text-left">
        <p className="text-[10px] font-semibold text-[var(--c0)]">
          The Deep Code
        </p>
        <h3 className="mt-2 text-base font-semibold">
          Mind, stillness & resilience
        </h3>
        <p className="mt-2 text-xs text-[var(--text-color-muted)]">
          Buddhist-informed mental models, deep work, and quiet confidence
          that make you steady under volatility.
        </p>
        <p className="mt-3 text-[9px] text-[var(--text-color-muted)]">
          This means you stop operating in panic mode.
        </p>
      </div>
    </div>
  </section>
);

// 3) Category Sections

const CategorySections: React.FC<{ articles: Article[] }> = ({
  articles,
}) => {
  const navigate = React.useContext(NavigationContext);

  const pick = (filter: (a: Article) => boolean, limit = 3) =>
    articles.filter(filter).slice(0, limit);

  const groups = [
    {
      key: 'wealth',
      title: 'The Wealth Engine',
      subtitle: 'Finance, compounding, and leverage without burnout.',
      who: 'For operators who want calm but aggressive money systems.',
      posts: pick((a) => a.category === 'Finance'),
    },
    {
      key: 'future',
      title: 'The Future Stack',
      subtitle: 'AI + tech as cognitive and financial leverage.',
      who: 'For builders using AI as a tool, not a distraction.',
      posts: pick((a) => a.category === 'Tech'),
    },
    {
      key: 'mind',
      title: 'The Deep Code',
      subtitle: 'Mindfulness, emotional clarity, and inner stability.',
      who: 'For people rewiring their default mental OS.',
      posts: pick((a) => a.category === 'Mindfulness'),
    },
  ];

  return (
    <section className="mt-20 max-w-6xl mx-auto">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Choose your starting track
        </h2>
        <Link to="/articles">
          <span className="text-[10px] text-[var(--c0)] hover:underline">
            View all insights →
          </span>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.key}
            className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-4 modern-card"
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: 'var(--c0)' }}
            >
              {group.title}
            </p>
            <p className="mt-1 text-[10px] text-[var(--text-color-muted)]">
              {group.subtitle}
            </p>
            <p className="mt-1 text-[9px] text-[var(--text-color-muted)]">
              {group.who}
            </p>
            <div className="mt-4 space-y-3">
              {group.posts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/article/${p.id}`)}
                  className="w-full text-left group"
                >
                  <p className="text-xs font-semibold group-hover:text-[var(--c0)] transition-colors">
                    {p.title}
                  </p>
                  <p className="text-[10px] text-[var(--text-color-muted)] line-clamp-2">
                    {p.excerpt}
                  </p>
                </button>
              ))}
              {group.posts.length === 0 && (
                <p className="text-[10px] text-[var(--text-color-muted)] italic">
                  Coming soon.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 4) Newsletter

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'done'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState('done');
  };

  return (
    <section className="mt-24">
      <div className="max-w-3xl mx-auto modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 backdrop-blur-xl p-6 sm:p-8 text-center">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: 'var(--c0)' }}
        >
          Season 01 • The Cognitive Flux Blueprint
        </p>
        <h3 className="mt-3 text-xl md:text-2xl font-bold">
          Get one high-signal lesson each week.
        </h3>
        <p className="mt-2 text-xs md:text-sm text-[var(--text-color-muted)]">
          No spam. One email. One mental model applied to money, focus, or
          work. Designed to be read in &lt; 5 minutes and implemented the
          same day.
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-5 flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <input
            type="email"
            placeholder="Enter your best email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:w-64 px-3 py-2 rounded-xl bg-[var(--bg-color)]/60 border border-[var(--card-border)] text-[var(--text-color-base)] text-xs focus:outline-none focus:ring-2 focus:ring-[var(--c0)]"
          />
          <ModernButton type="submit">
            {state === 'done' ? 'Joined' : 'Join the Flux'}
          </ModernButton>
        </form>
        {state === 'done' && (
          <p className="mt-2 text-[10px] text-[var(--c0)]">
            Nice. If this were live, your first Cognitive Flux brief would
            already be queued.
          </p>
        )}
      </div>
    </section>
  );
};

// 5) Trending

const TrendingSection: React.FC<{ articles: Article[] }> = ({
  articles,
}) => {
  const navigate = React.useContext(NavigationContext);
  const trending = [...articles].slice(0, 4);

  if (!trending.length) return null;

  return (
    <section className="mt-16 max-w-5xl mx-auto">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg font-semibold">Trending in Season 01</h3>
        <Link to="/articles">
          <span className="text-[9px] text-[var(--text-color-muted)] hover:text-[var(--c0)]">
            Browse all →
          </span>
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
        {trending.map((a) => (
          <button
            key={a.id}
            onClick={() => navigate(`/article/${a.id}`)}
            className="min-w-[180px] max-w-[220px] text-left rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 px-3 py-3 hover:border-[var(--c0)]/60 transition-colors"
          >
            <p
              className="text-[9px] uppercase tracking-[0.12em]"
              style={{ color: 'var(--c0)' }}
            >
              {a.category}
            </p>
            <p className="mt-1 text-xs font-semibold line-clamp-2">
              {a.title}
            </p>
            <p className="mt-1 text-[9px] text-[var(--text-color-muted)] line-clamp-2">
              {a.excerpt}
            </p>
            <p className="mt-1 text-[8px] text-[var(--text-color-muted)]">
              ~6 min read • High signal
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

// 6) Footer

const Footer: React.FC = () => (
  <footer className="mt-24 pb-10 pt-8 border-t border-[var(--card-border)]/60">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] text-[var(--text-color-muted)]">
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <div>
          <span className="font-semibold text-[var(--c0)]">
            Cognitive Flux
          </span>{' '}
          — systems for wealth, focus & inner calm.
        </div>
        <div>
          Season 01: Behavioral finance, AI leverage, and stillness.
        </div>
        <div className="opacity-70">
          Educational content only. Not financial, legal, or investment
          advice.
        </div>
      </div>
      <div className="flex gap-4">
        <Link to="/articles">
          <span className="hover:text-[var(--c0)]">Articles</span>
        </Link>
        <Link to="/login">
          <span className="hover:text-[var(--c0)]">Login</span>
        </Link>
        <Link to="/">
          <span className="hover:text-[var(--c0)]">Home</span>
        </Link>
      </div>
    </div>
  </footer>
);

// ===================== HOMEPAGE =====================

const HomePage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const featuredArticles = articles.slice(0, 3);
  const hero = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>({ threshold: 0.05 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const navigate = React.useContext(NavigationContext);

  return (
    <div className="relative overflow-hidden min-h-screen">
      <FinancialBackground />

      {/* HERO */}
      <section className="relative">
        <div
          ref={hero.ref}
          className={[
            'container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 text-center flex flex-col items-center',
            'transition-all duration-1000 ease-out',
            prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : hero.visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10',
          ].join(' ')}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium backdrop-blur-md"
            style={{
              color: 'var(--c0)',
              border:
                '1px solid color-mix(in oklab, var(--c0) 25%, transparent)',
              background:
                'color-mix(in oklab, var(--c0) 6%, transparent)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute h-full w-full rounded-full"
                style={{
                  background: 'var(--c0)',
                  opacity: 0.6,
                }}
              />
              <span
                className="relative h-2 w-2 rounded-full"
                style={{ background: 'var(--c0)' }}
              />
            </span>
            A signal-only library for serious builders.
          </div>

          <h1
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tight"
            style={{
              color: 'white',
              animation: prefersReducedMotion
                ? 'none'
                : 'fadeInUp 0.8s ease-out 0.2s both',
              textShadow:
                '0 0 4px rgba(255,255,255,0.2), 0 0 1px rgba(255,255,255,0.1)',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            Cognitive Flux
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg md:text-xl text-[var(--text-color-muted)] leading-relaxed"
            style={{
              animation: prefersReducedMotion
                ? 'none'
                : 'fadeInUp 0.8s ease-out 0.4s both',
            }}
          >
            Where disciplined finance, deep work, and inner stillness
            converge to give you quiet confidence in money and mind.
          </p>
          <p
            className="mt-2 max-w-2xl text-base md:text-lg text-[var(--text-color-muted)]/80"
            style={{
              animation: prefersReducedMotion
                ? 'none'
                : 'fadeInUp 0.8s ease-out 0.5s both',
            }}
          >
            Master your wealth. Master your attention. Use AI as leverage,
            not noise.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{
              animation: prefersReducedMotion
                ? 'none'
                : 'fadeInUp 0.8s ease-out 0.6s both',
            }}
          >
            <ModernButton onClick={() => navigate('/articles')}>
              📊 I want better money systems
            </ModernButton>
            <ModernGhostButton
              onClick={() => navigate('/articles')}
            >
              🧠 I want calm + focus
            </ModernGhostButton>
          </div>

          <p className="mt-4 text-[10px] text-[var(--text-color-muted)]">
            Built for founders, operators, and deep workers who hate generic
            threads.
          </p>

          <FinancialMandala />
        </div>
      </section>

      {/* FEATURED TODAY */}
      {articles[0] && <FeaturedToday article={articles[0]} />}

      {/* WHY COGNITIVE FLUX */}
      <WhyCognitiveFluxSection />

      {/* FEATURED INSIGHTS */}
      <section
        ref={grid.ref}
        className={[
          'container mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 ease-out',
          prefersReducedMotion
            ? 'opacity-100 translate-y-0'
            : grid.visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10',
        ].join(' ')}
      >
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              background:
                'linear-gradient(135deg, var(--c0), var(--c2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Featured Insights
          </h2>
          <p className="text-[var(--text-color-muted)] max-w-2xl mx-auto">
            Core essays from Season 01 that rewire how you think about money,
            risk, work, and identity.
          </p>
          <p className="mt-2 text-[10px] text-[var(--text-color-muted)]">
            Curated for high signal. No “5 tips” fluff.
          </p>
          <div
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--c0), transparent)',
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredArticles.map((article, i) => (
            <div
              key={article.id}
              className="transition-all duration-700 ease-out"
              style={{
                animation:
                  !prefersReducedMotion && grid.visible
                    ? `fadeInUp 0.6s ease-out ${0.1 + i * 0.1}s both`
                    : 'none',
              }}
            >
              <Tilt>
                <div className="modern-card group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl p-1 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
                    style={{
                      background:
                        'radial-gradient(circle at center, var(--g0), transparent 70%)',
                    }}
                  />
                  <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <ArticleCard article={article} />
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY TRACKS */}
      <CategorySections articles={articles} />

      {/* TRENDING */}
      <TrendingSection articles={articles} />

      {/* NEWSLETTER */}
      <NewsletterSection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

// ===================== APP CONTAINER =====================

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = React.useState('/');
  const articles = MOCK_ARTICLES;

  const handleLogin = (username: string, password: string): boolean =>
    username === 'test' && password === 'pass';

  const pathSegments = currentPath.split('/');
  const route = pathSegments[1];
  const id = pathSegments[2];

  const navigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderContent = () => {
    switch (route) {
      case 'articles':
        return <ArticlesPage articles={articles} />;
      case 'article':
        return <ArticlePage articles={articles} id={id} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'signup':
        return (
          <div
            className="min-h-screen flex items-center justify-center bg-[var(--bg-color)]"
            style={{ color: 'var(--c0)' }}
          >
            <div className="bg-[var(--card-bg)]/90 border border-[var(--card-border)] rounded-2xl p-8 shadow-2xl text-center">
              <h1 className="text-3xl font-bold mb-2">
                Mock Signup Page
              </h1>
              <p className="text-[var(--text-color-muted)] mb-4 text-sm">
                In a real build, this is where your onboarding flow would
                live.
              </p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
                className="hover:underline text-[var(--c0)] text-sm"
              >
                Go to Login
              </a>
            </div>
          </div>
        );
      case '':
      default:
        return <HomePage articles={articles} />;
    }
  };

  return (
    <NavigationContext.Provider value={navigate}>
      <div className="min-h-screen">
        <HueStyle />
        {renderContent()}
      </div>
    </NavigationContext.Provider>
  );
};

export default App;
