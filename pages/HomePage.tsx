import React, { useState } from 'react';

// ===================== MOCK DATA & COMPONENTS (Single-File Mandate) =====================

type Article = {
  id: number | string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  category: 'Finance' | 'Mindfulness' | 'Tech';
  content: string; // REQUIRED FIELD
};

// A simple markdown-to-html renderer
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  // Replace internal color references with theme colors
  const styleHeader = `style="color: var(--c0)"`;
  const styleText = `style="color: var(--text-color-base)"`;
  const styleMuted = `style="color: var(--text-color-muted)"`;
  
  const htmlContent = content
    .trim()
    .split('\n')
    .map(line => {
        if (line.startsWith('## ')) {
            return `<h2 class="text-3xl font-bold font-heading mt-10 mb-4" ${styleHeader}>${line.substring(3)}</h2>`;
        }
        if (line.startsWith('### ')) {
            return `<h3 class="text-2xl font-bold font-heading mt-8 mb-3" ${styleHeader}>${line.substring(4)}</h3>`;
        }
        if (line.startsWith('*   ')) {
            return `<li class="ml-8 list-disc mb-2" ${styleMuted}>${line.substring(4)}</li>`;
        }
        if (line.trim() === '') {
            return '<br />';
        }
        return `<p class="mb-4 leading-relaxed" ${styleText}>${line}</p>`;
    })
    .join('');
  return <div className="prose-base" dangerouslySetInnerHTML={{ __html: htmlContent.replace(/<br \/>(\s*<li)/g, '$1') }} />;
};


// FIX: Corrected MOCK_ARTICLES to include the required 'content' field for all entries.
const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Neurobiology of Debt: How Stress Impacts Spending",
    excerpt: "Exploring the psychological toll of financial instability and techniques for mindful money management.",
    date: "Oct 28, 2025",
    author: "Jane Doe",
    imageUrl: "https://images.unsplash.com/photo-1549646405-b77876a3809e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: 'Mindfulness',
    content: `
      ## The Stress-Spending Cycle
      
      Financial stress doesn't just impact your wallet; it profoundly changes your brain chemistry. The constant anxiety triggers the release of cortisol, which is linked to impulsive decision-making.

      ### Techniques for Mindful Management

      Mindfulness provides tools to interrupt this cycle. By practicing conscious awareness, we can create a delay between the impulse (stress) and the action (spending).

      *   **The 10-Second Pause:** Before any non-essential purchase, take 10 seconds to name the emotion driving the desire.
      *   **Budgeting as Meditation:** View your monthly budget as a focused, disciplined practice, not a punitive chore.
      *   **Digital Detox:** Minimize exposure to consumer-driven content to reduce external triggers.
      
      By integrating mindful practices, investors can move beyond emotional bias and build a truly resilient portfolio.
    `,
  },
  {
    id: 2,
    title: "AI-Driven Portfolio Optimization for the Emotionally Aware Investor",
    excerpt: "Using machine learning to eliminate human bias and maintain a disciplined, long-term investment strategy.",
    date: "Oct 25, 2025",
    author: "Alex Kim",
    imageUrl: "https://images.unsplash.com/photo-1698207907572-cfc3a1b8c8c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: 'Tech',
    content: `
      ## Algorithmic Clarity
      
      AI offers an unemotional lens on market data, bypassing human biases like fear of loss or herd mentality. This leads to **disciplined, predictable returns**.

      ### The Role of Emotional Intelligence

      While AI handles the data, the emotionally aware investor understands *when* to adjust the AI's parameters, not just *what* the AI suggests.

      *   **Defining Risk:** Your personal tolerance for risk is a human factor AI cannot replace.
      *   **Long-Term Vision:** AI models thrive on long-term, stable parameters set by a clear-headed investor.
    `,
  },
  {
    id: 3,
    title: "Compounding Clarity: Understanding the Power of Focused Growth",
    excerpt: "Financial growth mirrors mental growth. We break down simple, focused strategies for wealth building.",
    date: "Oct 20, 2025",
    author: "Sam Rivera",
    imageUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab99b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: 'Finance',
    content: `
      ## The Two Sides of Compounding

      The concept of compounding interest is well known, but far less understood is **compounding clarity**—the mental process of iterative learning.

      ### Focused Financial Strategies

      The goal isn't huge, sudden gains, but consistent, focused effort.

      *   **Automate Everything:** Reduce mental friction by automating savings and investments.
      *   **Review Annually, Not Daily:** Avoid the emotional rollercoaster of daily market noise.
      *   **Debt Management:** Treat high-interest debt reduction as the ultimate guaranteed return.
    `,
  },
  {
    id: 4,
    title: "Behavioral Finance: The 5 Traps to Avoid",
    excerpt: "A deep dive into common cognitive biases that sabotage investment returns.",
    date: "Oct 15, 2025",
    author: "Jane Doe",
    imageUrl: "https://images.unsplash.com/photo-1590283626274-1ed28a2a0a20?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: 'Finance',
    content: `
      ## The Cognitive Minefield
      
      Behavioral finance studies the influence of psychology on investor and analyst behavior. Our brains are wired for survival, not for optimal capital allocation.

      ### Top 5 Biases to Recognize

      Awareness is the first step to avoiding these common pitfalls:

      *   **Hindsight Bias:** Believing past events were predictable after they've occurred ("I knew it all along!").
      *   **Anchoring:** Relying too heavily on the first piece of information offered.
      *   **Loss Aversion:** The psychological pain of a loss is twice as powerful as the pleasure of a gain.
      *   **Confirmation Bias:** Seeking out information that confirms existing beliefs.
      *   **Herding:** Following the actions of a larger group, even against your better judgment.
    `,
  },
];

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <div className="flex flex-col h-full rounded-2xl p-6 bg-[var(--card-bg)]/60">
    <div className="flex-shrink-0">
      <img
        className="h-40 w-full object-cover rounded-xl mb-4 shadow-xl"
        src={article.imageUrl}
        alt={article.title}
        loading="lazy" 
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/0E294E/FFFFFF?text=Article+Image'; }}
      />
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium" style={{ color: 'var(--c0)' }}>
        {article.category}
      </p>
      <h3 className="mt-2 text-xl font-bold leading-snug transition-colors group-hover:text-white/90">
        <a href="#" className="hover:underline">
          {article.title}
        </a>
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

// Mock Link component for single-file routing
const Link: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const navigate = React.useContext(NavigationContext);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); navigate(to); }}>
      {children}
    </a>
  );
};

// Mock Article List Page
const ArticlesPage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const navigate = React.useContext(NavigationContext);
  const backBtn = useReveal<HTMLDivElement>();
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 cool-cycle">
      <div 
        ref={backBtn.ref}
        className={[
          "transition-all duration-700 ease-out mb-10",
          backBtn.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        ].join(' ')}
      >
        <ModernGhostButton onClick={() => navigate('/')}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </ModernGhostButton>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ color: 'var(--c0)' }}>
        All Financial & Mindful Insights
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, i) => (
          <div key={article.id} className="transition-all duration-700 ease-out" 
            style={{ 
              animation: backBtn.visible ? `fadeInUp 0.6s ease-out ${0.1 + i * 0.1}s both` : 'none' 
            }}
          >
            <Tilt>
              <div 
                className="modern-card group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl p-1 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/article/${article.id}`)} // Navigate on click
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
                  style={{ background: 'radial-gradient(circle at center, var(--g0), transparent 70%)' }}
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

const ArticlePage: React.FC<{ articles: Article[], id: number | string }> = ({ articles, id }) => {
  const navigate = React.useContext(NavigationContext);
  const article = articles.find(a => String(a.id) === String(id)); 

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center cool-cycle">
        <div className="text-center">
            <h1 className="text-4xl font-bold" style={{ color: 'var(--c0)' }}>Article not found</h1>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/articles') }} className="mt-4 inline-block hover:underline" style={{ color: 'var(--c0)' }}>Back to articles</a>
        </div>
      </div>
    );
  }

  const relatedArticles = articles.filter(a => String(a.id) !== String(id) && a.category === article.category).slice(0, 2);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 cool-cycle">
      <article className="max-w-3xl mx-auto bg-[var(--card-bg)] backdrop-blur-md p-6 sm:p-12 rounded-xl border border-[var(--card-border)]">
        
        <div className="mb-8">
          <ModernGhostButton onClick={() => navigate('/articles')}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Insights
          </ModernGhostButton>
        </div>
        
        <header className="text-center mb-12">
          <p className="font-semibold" style={{ color: 'var(--c0)' }}>{article.category}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mt-2">{article.title}</h1>
          <p className="text-[var(--text-color-muted)] mt-4">{article.author} &bull; {article.date}</p>
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
          <h3 className="text-2xl font-bold font-heading mb-6">Related Reads</h3>
          <div className="grid sm:grid-cols-2 gap-8">
              {relatedArticles.map(related => (
                <a 
                  key={related.id} 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigate(`/article/${related.id}`); }} 
                  className="block group bg-black/5 p-6 rounded-lg transition-colors border border-transparent hover:border-[var(--c0)]/50"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.05)', 
                  }}
                >
                    <h4 
                      className="font-bold text-white transition-colors group-hover:underline"
                      style={{ color: 'var(--text-color-base)', transition: 'color 0.3s ease-in-out' }}
                    >
                      {related.title}
                    </h4>
                    <p className="text-sm text-[var(--text-color-muted)] mt-2">{related.excerpt}</p>
                </a>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
};


// Mock Icons/Dependencies
const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m-9-9a9 9 0 019-9m0 18c-3 0-6-2.25-7.5-5.25M12 3v18M10 6h4M10 18h4M7 9h10M7 15h10"/>
    </svg>
);


// MOCK LOGIN PAGE COMPONENT (Themed and Unified)
const LoginPage: React.FC<{ onLogin: (u: string, p: string) => boolean }> = ({ onLogin }) => {
  const navigate = React.useContext(NavigationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login success
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
            style={{ color: 'var(--c0)', filter: 'drop-shadow(0 0 5px var(--g0))' }}
          />
          <h1 className="text-3xl font-bold text-[var(--text-color-base)] font-heading mt-4">Login</h1>
          <p className="text-[var(--text-color-muted)]">Access your Cognitive Flux account.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[var(--text-color-muted)] mb-2" htmlFor="username">Username</label>
            <input
              type="text"
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
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--c2), 0 0 10px var(--g0)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.boxShadow = '0 0 0 1px transparent';
              }}
              placeholder="e.g. jane"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[var(--text-color-muted)] mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--card-bg)] border rounded-lg px-4 py-2 text-[var(--text-color-base)] transition-shadow duration-300"
              style={{
                borderColor: 'var(--card-border)',
                boxShadow: '0 0 0 1px transparent',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--c0)';
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--c2), 0 0 10px var(--g0)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.boxShadow = '0 0 0 1px transparent';
              }}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <ModernButton type="submit" className="w-full">
            Login
          </ModernButton>
        </form>
        <p className="text-center text-[var(--text-color-muted)] mt-6">
            Don't have an account?{' '}
            <a 
                href='#'
                onClick={(e) => { e.preventDefault(); navigate('/signup'); }}
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


// ===================== COOL-HUE ENGINE & UTILITIES =====================

const NavigationContext = React.createContext< (path: string) => void>(() => {});

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
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
        --card-bg: 30 50% 10%;
        --card-border: 210 20% 25%;
        --text-color-muted: 210 20% 70%;
        --text-color-base: 0 0% 95%;
      }

      body {
        background-color: hsl(220 20% 10%);
        color: var(--text-color-base);
        font-family: 'Inter', sans-serif;
      }

      @keyframes coolHue { from { --h: 160; } to { --h: 260; } }
      ${!prefersReducedMotion ? `.cool-cycle { animation: coolHue 28s ease-in-out infinite alternate; }` : ''}

      /* Animations (omitted for brevity, maintained in original) */
      @keyframes marketPulse { 0%,100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 1; } }
      @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes titleFlux { 0% { filter: drop-shadow(0 4px 10px color-mix(in oklab, var(--c0) 30%, transparent)); transform: scale(1); } 50% { filter: drop-shadow(0 8px 20px color-mix(in oklab, var(--c0) 70%, transparent)); transform: scale(1.005); } 100% { filter: drop-shadow(0 4px 10px color-mix(in oklab, var(--c0) 30%, transparent)); transform: scale(1); } }
      @keyframes curveFlow { 0%, 100% { transform: translateX(0) translateY(0); } 33% { transform: translateX(5px) translateY(-5px); } 66% { transform: translateX(-5px) translateY(5px); } }
      @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }


      /* Modern glassmorphic buttons */
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
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
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
      .btn-ghost-hueshift > * { position: relative; z-index: 1; }

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

function useReveal<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.1 }) {
  const ref = React.useRef<T | null>(null);
  const [visible, setVisible] = React.useState(false);
  
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), opts);
    io.observe(el);
    return () => io.disconnect();
  }, [opts, prefersReducedMotion]);

  React.useLayoutEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
    }
  }, [prefersReducedMotion]);
  
  return { ref, visible };
}

function Tilt({ children, maxTilt = 5 }: { children: React.ReactNode; maxTilt?: number }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [{ rx, ry }, set] = React.useState({ rx: 0, ry: 0 });
  
  if (prefersReducedMotion) {
      return <div>{children}</div>;
  }
  
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    set({ 
      ry: (px - 0.5) * (maxTilt * 2), 
      rx: -(py - 0.5) * (maxTilt * 2)
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => set({ rx: 0, ry: 0 })}
      className="transition-transform duration-300 ease-out"
      style={{ transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)` }}
    >
      {children}
    </div>
  );
}

function FinancialBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const coolCycleClass = prefersReducedMotion ? '' : 'cool-cycle';

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${coolCycleClass}`}>
      <div
        className="absolute top-[15%] left-[10%] w-[500px] h-[500px] blur-[140px] rounded-full"
        style={{ 
          background: 'radial-gradient(circle, var(--g0), transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'float 18s ease-in-out infinite'
        }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] blur-[180px] rounded-full"
        style={{ 
          background: 'radial-gradient(circle, var(--g1), transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'float 22s ease-in-out 4s infinite'
        }}
      />
      
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 650 Q 180 600, 360 620 T 720 580 T 1440 550"
          fill="none" 
          stroke="var(--c0)" 
          strokeOpacity="0.3" 
          strokeWidth="2"
          strokeDasharray={prefersReducedMotion ? "none" : "1000"}
          style={prefersReducedMotion ? {} : { animation: 'chartGrow 3s ease-out forwards, float 15s ease-in-out 3s infinite' }}
        />
        <path
          d="M0 700 Q 200 680, 400 690 T 800 670 T 1440 650"
          fill="none" 
          stroke="var(--c1)" 
          strokeOpacity="0.25" 
          strokeWidth="2"
          strokeDasharray={prefersReducedMotion ? "none" : "1000"}
          style={prefersReducedMotion ? {} : { animation: 'chartGrow 3s ease-out 0.3s forwards, float 18s ease-in-out 3.5s infinite' }}
        />
        <path
          d="M0 750 Q 220 720, 440 735 T 880 710 T 1440 690"
          fill="none" 
          stroke="var(--c2)" 
          strokeOpacity="0.2" 
          strokeWidth="2"
          strokeDasharray={prefersReducedMotion ? "none" : "1000"}
          style={prefersReducedMotion ? {} : { animation: 'chartGrow 3s ease-out 0.6s forwards, float 20s ease-in-out 4s infinite' }}
        />
        
        {[...Array(24)].map((_, i) => (
          <circle
            key={`market-${i}`}
            cx={60 + i * 60}
            cy={650 - (i % 4) * 30 - Math.sin(i * 0.5) * 20}
            fill="var(--c0)"
            opacity={0.4}
            style={prefersReducedMotion ? { r: 3 } : { animation: `dotPulse ${3 + (i % 3)}s ease-in-out ${i * 0.15}s infinite` }}
            r={prefersReducedMotion ? "3" : "2"}
          />
        ))}
        
        {[...Array(12)].map((_, i) => (
          <rect
            key={`candle-${i}`}
            x={120 + i * 110}
            y={600 + (i % 3) * 40}
            width="3"
            height={60 + (i % 4) * 20}
            fill="var(--c0)"
            opacity={0.2}
            style={prefersReducedMotion ? {} : { 
              transformOrigin: `${122 + i * 110}px 800px`,
              animation: `candlestick ${4 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`
            }}
          />
        ))}
        
        {[...Array(8)].map((_, i) => (
          <line
            key={`neural-${i}`}
            x1={200 + i * 150}
            y1={200 + (i % 3) * 80}
            x2={280 + i * 150}
            y2={240 + (i % 2) * 60}
            stroke="var(--c2)"
            strokeOpacity={0.15}
            strokeWidth="1"
            strokeDasharray="4 4"
            style={prefersReducedMotion ? {} : { animation: `breathe ${5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite` }}
          />
        ))}
      </svg>
    </div>
  );
}

function FinancialMandala() {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  return (
    <div className="relative mx-auto mt-16 flex w-full max-w-[560px] flex-col items-center justify-center cool-cycle">
      <div className="relative h-[340px] w-[340px] sm:h-[400px] sm:w-[400px]">
        <div 
          className="absolute inset-0 blur-[120px] rounded-full"
          style={prefersReducedMotion ? { background: 'radial-gradient(circle, var(--g0), transparent 70%)', opacity: 0.8 } : { 
            background: 'radial-gradient(circle, var(--g0), transparent 70%)',
            animation: 'marketPulse 6s ease-in-out infinite'
          }} 
        />

        <svg viewBox="0 0 400 400" className="relative h-full w-full" aria-hidden="true">
          {[80, 110, 140, 170].map((r, i) => (
            <circle 
              key={`ring-${r}`}
              cx="200" 
              cy="200" 
              r={r} 
              fill="none"
              stroke={i % 2 === 0 ? 'var(--c0)' : 'var(--c1)'} 
              strokeOpacity={0.25 - i * 0.03} 
              strokeWidth="1.5"
              strokeDasharray={i === 1 ? "8 4" : i === 3 ? "4 8" : "none"}
              style={prefersReducedMotion ? {} : { 
                transformOrigin: '200px 200px',
                animation: `${i % 2 === 0 ? 'spinMandala' : 'spinMandalaR'} ${30 + i * 8}s linear infinite`
              }}
            />
          ))}
          
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const startR = 40;
            const endR = 160;
            return (
              <g key={`spoke-${i}`}>
                <line 
                  x1={200 + Math.cos(angle) * startR}
                  y1={200 + Math.sin(angle) * startR}
                  x2={200 + Math.cos(angle) * endR}
                  y2={200 + Math.sin(angle) * endR}
                  stroke="var(--c0)" 
                  strokeOpacity={0.2} 
                  strokeWidth="1"
                  style={prefersReducedMotion ? {} : { animation: `breathe ${6 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }}
                />
                <circle
                  cx={200 + Math.cos(angle) * 150}
                  cy={200 + Math.sin(angle) * 150}
                  r="3" 
                  fill="var(--c0)"
                  opacity="0.5"
                  style={prefersReducedMotion ? {} : { animation: `marketPulse ${4 + (i % 3)}s ease-in-out ${i * 0.25}s infinite` }}
                />
              </g>
            );
          })}
          
          <path
            d="M80,280 Q120,250 160,260 T240,240 T320,220"
            fill="none" 
            stroke="var(--c0)" 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeDasharray={prefersReducedMotion ? 'none' : 500}
            strokeDashoffset={prefersReducedMotion ? '0' : undefined}
            style={prefersReducedMotion ? { filter: 'drop-shadow(0 0 12px var(--g0))'} : { 
              filter: 'drop-shadow(0 0 12px var(--g0))',
              animation: 'lineGrow 2.5s ease-out 0.5s forwards, curveFlow 12s ease-in-out infinite' 
            }}
          />
          
          {[80, 160, 240, 320].map((x, i) => (
            <circle
              key={`curve-point-${i}`}
              cx={x}
              cy={280 - i * 20 - (i === 2 ? 5 : 0)}
              r="5"
              fill="var(--c2)"
              style={prefersReducedMotion ? { filter: 'drop-shadow(0 0 8px var(--g0))' } : { 
                filter: 'drop-shadow(0 0 8px var(--g0))',
                animation: `marketPulse 3s ease-in-out ${i * 0.3}s infinite`
              }}
            />
          ))}
          
          <g>
            <circle 
              cx="200" 
              cy="200" 
              r="12"
              fill="url(#mindfulGradient)"
              style={prefersReducedMotion ? { filter: 'drop-shadow(0 0 20px var(--g0))', opacity: 1 } : { 
                filter: 'drop-shadow(0 0 20px var(--g0))',
                animation: 'marketPulse 4s ease-in-out infinite'
              }}
            />
            {[0, 1, 2].map(i => (
              <circle
                key={`breath-${i}`}
                cx="200"
                cy="200"
                r="12"
                fill="none"
                stroke="var(--c0)"
                strokeWidth="2"
                strokeOpacity="0.6"
                style={prefersReducedMotion ? { opacity: 0 } : {
                  animation: `mindfulPulse 3s ease-out ${i * 0.8}s infinite`
                }}
              />
            ))}
          </g>
          
          {[...Array(6)].map((_, i) => (
            <circle
              key={`orbit-${i}`}
              r="4"
              fill={i % 2 === 0 ? 'var(--c0)' : 'var(--c2)'}
              opacity="0.7"
              style={{ filter: 'drop-shadow(0 0 4px var(--g0))' }}
            >
              <animateMotion
                dur={`${16 + i * 3}s`}
                repeatCount="indefinite"
                path={`M200,${90 + i * 18} A${110 + i * 18},${110 + i * 18} 0 1,1 200,${310 - i * 18} A${110 + i * 18},${110 + i * 18} 0 1,1 200,${90 + i * 18}`}
              />
            </circle>
          ))}
          
          <defs>
            <radialGradient id="mindfulGradient">
              <stop offset="0%" stopColor="var(--c0)" />
              <stop offset="100%" stopColor="var(--c2)" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-4 sm:mx-0 mt-12 w-full overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl shadow-lg">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--card-bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--card-bg)] to-transparent z-10 pointer-events-none" />
        <div className="flex whitespace-nowrap py-3" style={prefersReducedMotion ? {} : { animation: 'ticker 35s linear infinite' }}>
          {['🧘 MINDFUL','💰 INVEST','🎯 FOCUS','💡 INSIGHT','⚖️ BALANCE','📊 WEALTH','🧠 CLARITY','💎 VALUE','🌱 COMPOUND']
            .flatMap(t => [t, t, t]).map((t, i) => (
              <span 
                key={i} 
                className="px-6 text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--c0)' }}
              >
                {t}
              </span>
            ))}
        </div>
      </div>
      
      <div className="mt-8 text-center max-w-md">
        <p className="text-sm text-[var(--text-color-muted)] italic">
          "The intersection of financial wisdom and mindful awareness"
        </p>
      </div>
    </div>
  );
}

function ModernButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
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

function ModernGhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
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

const HomePage: React.FC<{ articles: Article[] }> = ({ articles }) => { // FIX APPLIED HERE
  const featuredArticles = articles.slice(0, 3);
  const hero = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>({ threshold: 0.05 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const navigate = React.useContext(NavigationContext);

  const heroClasses = prefersReducedMotion 
    ? "opacity-100 translate-y-0" 
    : (hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
  
  const gridClasses = prefersReducedMotion 
    ? "opacity-100 translate-y-0"
    : (grid.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");

  return (
    <div className="relative overflow-hidden min-h-screen">
      <FinancialBackground />

      <section className="relative">
        <div
          ref={hero.ref}
          className={[
            "container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 text-center flex flex-col items-center",
            "transition-all duration-1000 ease-out",
            heroClasses
          ].join(' ')}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium backdrop-blur-md"
            style={{
              color: 'var(--c0)',
              border: '1px solid color-mix(in oklab, var(--c0) 25%, transparent)',
              background: 'color-mix(in oklab, var(--c0) 6%, transparent)',
              animation: prefersReducedMotion ? 'none' : 'fadeInScale 0.6s ease-out',
              transform: 'translateY(-10px)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full rounded-full" style={{ background: 'var(--c0)', opacity: 0.6, animation: prefersReducedMotion ? 'none' : 'animate-ping' }} />
              <span className="relative h-2 w-2 rounded-full" style={{ background: 'var(--c0)' }} />
            </span>
            Financial insights + Mindful living
          </div>

          <h1
    className="mt-8 text-5xl md:text-7xl font-bold tracking-tight"
    style={{ 
        // --- Color set to White ---
        color: 'white',
        // --- Remove gradient effects ---
        WebkitBackgroundClip: 'unset',
        WebkitTextFillColor: 'unset',
        // --- Animation: Retain fadeInUp, remove titleFlux ---
        animation: prefersReducedMotion ? 'none' : 'fadeInUp 0.8s ease-out 0.2s both',
        marginTop: '-0.5rem',
        // --- Subtle White Shadow for Dark Theme ---
        textShadow: '0 0 4px rgba(255, 255, 255, 0.2), 0 0 1px rgba(255, 255, 255, 0.1)', 
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
    }}
>
    Cognitive Flux
</h1>

          <p 
            className="mt-6 max-w-2xl text-lg md:text-xl text-[var(--text-color-muted)] leading-relaxed"
            style={{ animation: prefersReducedMotion ? 'none' : 'fadeInUp 0.8s ease-out 0.4s both' }}
          >
            Where Finance Meets Mindfulness & AI
          </p>
          <p 
            className="mt-2 max-w-2xl text-base md:text-lg text-[var(--text-color-muted)]/80"
            style={{ animation: prefersReducedMotion ? 'none' : 'fadeInUp 0.8s ease-out 0.5s both' }}
          >
            Master your wealth, Master your mind
          </p>

          <div 
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animation: prefersReducedMotion ? 'none' : 'fadeInUp 0.8s ease-out 0.6s both' }}
          >
            <Link to="/articles">
              <ModernButton>
                📊 Explore Insights
              </ModernButton>
            </Link>

            <Link to="/login">
              <ModernGhostButton>
                🧠 Account Login
              </ModernGhostButton>
            </Link>
          </div>

          <FinancialMandala />
        </div>
      </section>

      <section
        ref={grid.ref}
        className={[
          "container mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 ease-out",
          gridClasses
        ].join(' ')}
      >
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, var(--c0), var(--c2))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Featured Insights
          </h2>
          <p className="text-[var(--text-color-muted)] max-w-2xl mx-auto">
            Discover the convergence of financial wisdom and mindful awareness
          </p>
          <div 
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{ 
              background: `linear-gradient(90deg, transparent, var(--c0), transparent)`
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredArticles.map((article, i) => (
            <div
              key={article.id}
              className="transition-all duration-700 ease-out"
              style={{
                animation: prefersReducedMotion ? 'none' : (grid.visible ? `fadeInUp 0.6s ease-out ${0.1 + i * 0.1}s both` : 'none')
              }}
            >
              <Tilt>
                <div 
                  className="modern-card group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl p-1 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/article/${article.id}`)}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
                    style={{ background: 'radial-gradient(circle at center, var(--g0), transparent 70%)' }}
                  />
                  
                  <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <ArticleCard article={article} />
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/articles">
            <ModernGhostButton>
              View All Insights
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </ModernGhostButton>
          </Link>
        </div>
      </section>
    </div>
  );
};


// ===================== APP CONTAINER =====================

const App: React.FC = () => {
  // FIX: Setting default path to the root ('/') so HomePage loads first.
  const [currentPath, setCurrentPath] = React.useState('/'); 
  const articles = MOCK_ARTICLES;

  // Mock login handler
  const handleLogin = (username: string, password: string): boolean => {
    // Simple mock check
    return username === 'test' && password === 'pass'; 
  };

  // Simple router logic: /route/id
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
      case 'signup': // Mock signup page for continuity
        return <div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--c0)' }}>
            <h1 className="text-3xl">Mock Signup Page</h1>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="ml-4 hover:underline">Go to Login</a>
        </div>;
      case '':
      default:
        // Case '' handles '/', default handles unrecognized paths
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