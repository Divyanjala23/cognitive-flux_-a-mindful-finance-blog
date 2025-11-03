import type { Article, User } from '../types';

export const mockArticles: Article[] = [
  {
    id: 'mindful-investing-ai',
    title: 'The Zen of AI: Mindful Investing in the Digital Age',
    author: 'Jane Doe',
    date: '2023-10-26',
    category: 'Mindful Finance',
    tags: ['AI', 'Investing', 'Mindfulness'],
    imageUrl: 'https://picsum.photos/seed/zen-ai/800/400',
    excerpt: 'Discover how to combine the ancient wisdom of mindfulness with cutting-edge AI to make calmer, more intelligent investment decisions.',
    content: `
## Finding Calm in Financial Chaos

The market is volatile, driven by algorithms and human emotion. Mindfulness provides the anchor, allowing you to observe without reacting. AI provides the data-driven insights, cutting through the noise.

### Three Core Principles

1.  **Observe, Don't Absorb**: Use AI tools to gather data, but apply mindful awareness before acting. Are you investing based on logic or fear?
2.  **Automate with Intention**: Set up automated investment plans based on your long-term goals, not on fleeting market trends. This is where financial discipline meets technological ease.
3.  **Digital Detox for Your Portfolio**: Constant chart-watching creates anxiety. Schedule specific times to review your AI-driven reports and trust your system the rest of the time.
`
  },
  {
    id: 'cognitive-wealth-system',
    title: 'Building Cognitive Wealth: Beyond the Bank Account',
    author: 'John Smith',
    date: '2023-10-22',
    category: 'Personal Growth',
    tags: ['Wealth', 'Mindset', 'Growth'],
    imageUrl: 'https://picsum.photos/seed/cognitive-wealth/800/400',
    excerpt: 'True wealth isn\'t just about money; it\'s about mental clarity, focus, and resilience. Learn how to build a stronger mind to build a stronger life.',
    content: `
## The Ultimate Asset: Your Mind

Your ability to think clearly, solve problems, and stay resilient is your greatest asset. Financial success is often a byproduct of a well-managed mind.

### Pillars of Cognitive Wealth

*   **Radical Focus**: Eliminate distractions and dedicate deep work blocks to your most important tasks. This is where you create real value.
*   **Systematic Learning**: Actively acquire new skills, especially in high-leverage areas like AI, communication, and finance.
*   **Mindful Resilience**: Practice meditation and self-reflection to handle setbacks without derailing your progress. Failure is data, not a disaster.
`
  },
  {
    id: 'ai-powered-side-hustles',
    title: 'Flow State Hustles: 3 AI-Powered Side Incomes',
    author: 'Alex Ray',
    date: '2023-10-18',
    category: 'Side Hustles',
    tags: ['AI', 'Side Hustle', 'Flow State'],
    imageUrl: 'https://picsum.photos/seed/flow-hustle/800/400',
    excerpt: 'Leverage AI to create income streams that align with your passions and allow you to enter a state of deep, focused work, or "flow."',
    content: `
## Work That Doesn't Feel Like Work

The best side hustles are those that tap into your natural interests. AI can handle the repetitive parts, leaving you with the creative, engaging work that leads to a state of flow.

1.  **AI-Assisted Artisan**: Use AI image generators for inspiration and marketing visuals for your craft, be it writing, art, or music.
2.  **Niche Knowledge Curator**: Use AI to scan, summarize, and organize information for a niche newsletter. You provide the human insight and curation.
3.  **Personalized Coach with an AI Bot**: Develop an AI chatbot to handle initial client questions and scheduling, freeing you up to provide high-value, personalized coaching.
`
  },
];

export const mockUsers: User[] = [
    { id: 'user-1', username: 'admin', password: 'password', role: 'admin' },
    { id: 'user-2', username: 'jane', password: 'password123', role: 'user' },
];