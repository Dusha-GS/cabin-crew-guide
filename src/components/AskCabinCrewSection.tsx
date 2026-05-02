import { useState } from "react";
import { callClaude } from "../hooks/useClaude";
import BackButton from "./BackButton";

interface Props {
  goBack: () => void;
  previousLabel: string;
  isPremium: boolean;
  onUpgrade: () => void;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  question: string;
  category: string;
  timestamp: string;
  aiAnswer?: string;
  aiAnswerLoading?: boolean;
  replies: Reply[];
  likes: number;
  liked: boolean;
}

interface Reply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  isExpert?: boolean;
}

const CATEGORIES = ["All", "Emirates", "Qatar Airways", "Etihad Airways", "flydubai", "Air Arabia", "Interview Tips", "CV Help", "Life as Crew"];

const FORUM_SYSTEM = `You are a senior cabin crew expert with 15+ years of experience working for top Middle Eastern airlines including Emirates, Qatar Airways, and Etihad Airways. You now mentor aspiring cabin crew candidates.

Answer questions with insider knowledge, practical advice, and genuine warmth. Be specific — reference real airline procedures, culture, and requirements. Keep answers concise but helpful (3-5 sentences). End with one actionable tip.`;

const SEED_POSTS: Post[] = [
  {
    id: "1",
    author: "Sarah M.",
    avatar: "S",
    question: "I have my Emirates open day next week. What should I wear and what are the biggest mistakes people make on the day?",
    category: "Emirates",
    timestamp: "2 hours ago",
    aiAnswer: "For Emirates open days, wear a smart business suit or dress in neutral colors — navy, black, or grey. Your hair must be completely off your face in a neat bun or chignon. The biggest mistakes I see: arriving late (arrive 30 mins early), not engaging with other candidates (recruiters watch group dynamics from the moment you enter), and wearing heavy makeup or strong perfume. Smile genuinely from the moment you walk in — you're being assessed before the formal process even starts. Actionable tip: Practice reaching 212cm on your tiptoes daily this week so it feels natural on the day.",
    replies: [
      { id: "r1", author: "Priya K.", avatar: "P", content: "I got through my Emirates open day last month! One thing I'd add — bring multiple copies of your CV even if they say not to. Shows initiative.", timestamp: "1 hour ago" },
      { id: "r2", author: "Former Emirates Crew", avatar: "E", content: "Sarah is right about the smile. We were told to notice who was genuinely warm vs performing warmth. It shows.", timestamp: "45 min ago", isExpert: true }
    ],
    likes: 24,
    liked: false,
  },
  {
    id: "2",
    author: "Ahmed R.",
    avatar: "A",
    question: "Is it true Qatar Airways rejects you if you have any tattoos? I have a small one on my ankle.",
    category: "Qatar Airways",
    timestamp: "5 hours ago",
    aiAnswer: "Qatar Airways — like all major ME airlines — requires that tattoos are not visible when you're in uniform. A small ankle tattoo is generally fine as long as it's completely covered by your uniform socks and trousers/skirt during duty. During the assessment, wear clothing that covers it fully. The key question is: will it ever be visible in your Qatar Airways uniform? If the answer is no, you are unlikely to face rejection for it. Actionable tip: Bring or wear opaque skin-colored stockings to the assessment to ensure complete coverage during any physical checks.",
    replies: [
      { id: "r3", author: "Layla T.", avatar: "L", content: "I have two small tattoos — one on my wrist (always covered by watch) and one on my hip. Got through QR selection with no issues!", timestamp: "3 hours ago" }
    ],
    likes: 18,
    liked: false,
  },
  {
    id: "3",
    author: "Maria C.",
    avatar: "M",
    question: "How long does the Etihad interview process take from open day to receiving an offer? I applied 3 weeks ago and heard nothing.",
    category: "Etihad Airways",
    timestamp: "1 day ago",
    aiAnswer: "The Etihad recruitment process typically takes 4-12 weeks from open day to offer, though it can vary significantly depending on their hiring cycle and current crew requirements. Three weeks with no response after an open day is completely normal — they process hundreds of candidates. If you haven't received a rejection email, you may still be in consideration. The silence often means you're in a holding pool while they complete background checks on other candidates. Actionable tip: Use this waiting time productively — keep practicing interview questions and researching Etihad so you're ready to impress immediately when they call.",
    replies: [],
    likes: 31,
    liked: false,
  },
];

export default function AskCabinCrewSection({ goBack, previousLabel, isPremium, onUpgrade }: Props) {
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState("Interview Tips");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>("1");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyAuthor, setReplyAuthor] = useState("");

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const submitQuestion = async () => {
    if (!newQuestion.trim() || !authorName.trim()) return;
    setSubmitting(true);

    const newPost: Post = {
      id: Date.now().toString(),
      author: authorName.trim(),
      avatar: authorName.trim()[0].toUpperCase(),
      question: newQuestion.trim(),
      category: newQuestionCategory,
      timestamp: "Just now",
      aiAnswerLoading: true,
      replies: [],
      likes: 0,
      liked: false,
    };

    setPosts(prev => [newPost, ...prev]);
    setNewQuestion("");
    setAuthorName("");

    try {
      const answer = await callClaude(
        [{ role: "user", content: `A cabin crew candidate asks: "${newPost.question}" — Please answer as an expert.` }],
        { system: FORUM_SYSTEM, max_tokens: 400 }
      );
      setPosts(prev => prev.map(p =>
        p.id === newPost.id ? { ...p, aiAnswer: answer, aiAnswerLoading: false } : p
      ));
    } catch {
      setPosts(prev => prev.map(p =>
        p.id === newPost.id ? { ...p, aiAnswer: "Our expert team will answer this question shortly. Check back in a few hours!", aiAnswerLoading: false } : p
      ));
    } finally {
      setSubmitting(false);
    }
  };

  const submitReply = (postId: string) => {
    const text = replyText[postId];
    if (!text?.trim() || !replyAuthor.trim()) return;

    const reply: Reply = {
      id: Date.now().toString(),
      author: replyAuthor.trim(),
      avatar: replyAuthor.trim()[0].toUpperCase(),
      content: text.trim(),
      timestamp: "Just now",
    };

    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
    ));
    setReplyText(prev => ({ ...prev, [postId]: "" }));
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  // Paywall screen
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
          <div className="text-center mb-10">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-4xl font-bold text-white mb-4">Ask Cabin Crew</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Get real answers from cabin crew experts and connect with fellow candidates — exclusively for Premium members.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/30 to-slate-800 border border-amber-500/30 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: "🤖", title: "Instant AI Answers", desc: "Every question gets an immediate expert-level AI answer powered by Claude" },
                { icon: "👥", title: "Community Discussion", desc: "Connect with other candidates and share your experiences" },
                { icon: "✈️", title: "Expert Insights", desc: "Answers reviewed by former Middle East cabin crew professionals" },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="text-white font-bold text-sm mb-2">{item.title}</p>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Preview of locked posts */}
            <div className="space-y-3 mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 z-10 rounded-xl" />
              {SEED_POSTS.slice(0, 2).map(post => (
                <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-4 blur-sm">
                  <p className="text-white text-sm font-medium">{post.question}</p>
                  <p className="text-slate-400 text-xs mt-1">{post.author} · {post.category} · {post.likes} likes</p>
                </div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl px-6 py-4 text-center">
                  <p className="text-amber-400 font-bold text-lg mb-1">🔒 Premium Members Only</p>
                  <p className="text-slate-400 text-sm">{posts.length} questions answered so far</p>
                </div>
              </div>
            </div>

            <button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.01] shadow-lg shadow-amber-500/20"
            >
              Unlock Premium — $25 One-Time →
            </button>
            <p className="text-slate-500 text-xs text-center mt-3">Instant access · Lifetime membership · No subscription</p>
          </div>
        </div>
      </div>
    );
  }

  // Forum screen (premium users)
  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        <div className="text-center mb-8">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
            ✈️ Premium Members Only
          </span>
          <h2 className="text-4xl font-bold text-white mb-2">Ask Cabin Crew</h2>
          <p className="text-slate-400">Ask anything. Get expert AI answers instantly. Discuss with fellow candidates.</p>
        </div>

        {/* Ask a question */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-amber-500/20 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>💬</span> Ask Your Question
          </h3>
          <div className="space-y-3">
            <input
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Your first name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/50 transition-all"
            />
            <select
              value={newQuestionCategory}
              onChange={e => setNewQuestionCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all"
            >
              {CATEGORIES.filter(c => c !== "All").map(c => (
                <option key={c} value={c} className="bg-slate-800">{c}</option>
              ))}
            </select>
            <textarea
              value={newQuestion}
              onChange={e => setNewQuestion(e.target.value)}
              placeholder="What would you like to ask? Be specific — the more detail you give, the better the answer."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-amber-500/50 transition-all"
            />
            <button
              onClick={submitQuestion}
              disabled={!newQuestion.trim() || !authorName.trim() || submitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 disabled:opacity-40 text-slate-900 font-bold py-3 rounded-xl transition-all"
            >
              {submitting ? "Getting AI answer..." : "Post Question → Get Instant AI Answer"}
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/20 transition-all">
              {/* Post header */}
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-white font-semibold text-sm">{post.author}</span>
                      <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">{post.category}</span>
                      <span className="text-slate-500 text-xs">{post.timestamp}</span>
                    </div>
                    <p className="text-white text-sm font-medium leading-relaxed">{post.question}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 pl-12">
                  <button
                    onClick={e => { e.stopPropagation(); toggleLike(post.id); }}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${post.liked ? "text-amber-400" : "text-slate-500 hover:text-amber-400"}`}
                  >
                    <span>{post.liked ? "♥" : "♡"}</span> {post.likes}
                  </button>
                  <span className="text-slate-500 text-xs">💬 {post.replies.length} {post.replies.length === 1 ? "reply" : "replies"}</span>
                  <span className="text-slate-500 text-xs ml-auto">{expandedPost === post.id ? "▲ Hide" : "▼ View answers"}</span>
                </div>
              </div>

              {/* Expanded content */}
              {expandedPost === post.id && (
                <div className="border-t border-white/10">
                  {/* AI Answer */}
                  <div className="p-5 bg-amber-500/5 border-b border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 text-xs font-bold">
                        ✈
                      </div>
                      <span className="text-amber-400 font-bold text-sm">Expert AI Answer</span>
                      <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">Powered by Claude</span>
                    </div>
                    {post.aiAnswerLoading ? (
                      <div className="flex gap-1 items-center h-5">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    ) : (
                      <p className="text-slate-300 text-sm leading-relaxed">{post.aiAnswer}</p>
                    )}
                  </div>

                  {/* Member replies */}
                  {post.replies.length > 0 && (
                    <div className="p-5 space-y-4 border-b border-white/5">
                      {post.replies.map(reply => (
                        <div key={reply.id} className="flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            reply.isExpert ? "bg-green-500/20 border border-green-500/40 text-green-400" : "bg-white/10 text-slate-300"
                          }`}>
                            {reply.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white text-xs font-semibold">{reply.author}</span>
                              {reply.isExpert && (
                                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/30">Former Crew</span>
                              )}
                              <span className="text-slate-500 text-xs">{reply.timestamp}</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add reply */}
                  <div className="p-5">
                    <p className="text-slate-400 text-xs mb-3 font-medium">Add your experience or tip:</p>
                    <div className="flex gap-2">
                      <input
                        value={replyAuthor}
                        onChange={e => setReplyAuthor(e.target.value)}
                        placeholder="Your name"
                        className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500/50 transition-all flex-shrink-0"
                      />
                      <input
                        value={replyText[post.id] || ""}
                        onChange={e => setReplyText(prev => ({ ...prev, [post.id]: e.target.value }))}
                        placeholder="Share your experience or tip..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500/50 transition-all"
                        onKeyDown={e => { if (e.key === "Enter") submitReply(post.id); }}
                      />
                      <button
                        onClick={() => submitReply(post.id)}
                        disabled={!replyText[post.id]?.trim() || !replyAuthor.trim()}
                        className="bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30 disabled:opacity-40 px-3 py-2 rounded-lg text-xs font-bold transition-all flex-shrink-0"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-slate-400">No questions in this category yet. Be the first to ask!</p>
          </div>
        )}
      </div>
    </div>
  );
}
