import { useState } from "react";
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

const SEED_POSTS: Post[] = [
  {
    id: "1",
    author: "Sarah M.",
    avatar: "S",
    question: "I have my Emirates open day next week. What should I wear and what are the biggest mistakes people make on the day?",
    category: "Emirates",
    timestamp: "2 hours ago",
    replies: [
      { id: "r1", author: "Priya K.", avatar: "P", content: "I got through my Emirates open day last month! One thing I'd add — bring multiple copies of your CV even if they say not to. Shows initiative.", timestamp: "1 hour ago" },
      { id: "r2", author: "Dubravka (Expert)", avatar: "D", content: "Wear a smart business suit in neutral colors — navy, black, or grey. Hair must be completely off your face. Arrive 30 mins early and smile genuinely from the moment you walk in — you're being assessed before the formal process even starts!", timestamp: "45 min ago", isExpert: true }
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
    replies: [],
    likes: 31,
    liked: false,
  },
];

const FORMSPREE_URL = "https://formspree.io/f/xnjwjbbl";

export default function AskCabinCrewSection({ goBack, previousLabel, isPremium, onUpgrade }: Props) {
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState("Interview Tips");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [expandedPost, setExpandedPost] = useState<string | null>("1");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyAuthor, setReplyAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const submitQuestion = async () => {
    if (!newQuestion.trim() || !authorName.trim() || !authorEmail.trim()) return;
    setSubmitting(true);

    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: authorName.trim(),
          email: authorEmail.trim(),
          category: newQuestionCategory,
          question: newQuestion.trim(),
        }),
      });

      const newPost: Post = {
        id: Date.now().toString(),
        author: authorName.trim(),
        avatar: authorName.trim()[0].toUpperCase(),
        question: newQuestion.trim(),
        category: newQuestionCategory,
        timestamp: "Just now",
        replies: [],
        likes: 0,
        liked: false,
      };

      setPosts(prev => [newPost, ...prev]);
      setNewQuestion("");
      setAuthorName("");
      setAuthorEmail("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert("Something went wrong. Please try again.");
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
              Post your questions and get personal answers from a real cabin crew expert — exclusively for Premium members.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/30 to-slate-800 border border-amber-500/30 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: "✋", title: "Real Expert Answers", desc: "Every question is personally answered by a former Middle Eastern airline cabin crew professional" },
                { icon: "👥", title: "Community Discussion", desc: "Connect with other candidates and share your experiences" },
                { icon: "✈️", title: "Insider Knowledge", desc: "Get honest, specific advice you won't find anywhere else" },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="text-white font-bold text-sm mb-2">{item.title}</p>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

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
              Unlock Premium — $25/month →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        <div className="text-center mb-8">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
            ✈️ Premium Members Only
          </span>
          <h2 className="text-4xl font-bold text-white mb-2">Ask Cabin Crew</h2>
          <p className="text-slate-400">Post your question and our expert will reply to your email personally within 24 hours.</p>
        </div>

        {/* Ask a question */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-amber-500/20 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>💬</span> Post Your Question
          </h3>

          {submitted && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-4 text-center">
              <p className="text-green-400 font-bold">✅ Question submitted!</p>
              <p className="text-slate-400 text-sm mt-1">We'll reply to your email within 24 hours.</p>
            </div>
          )}

          <div className="space-y-3">
            <input
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Your first name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/50 transition-all"
            />
            <input
              value={authorEmail}
              onChange={e => setAuthorEmail(e.target.value)}
              placeholder="Your email address (so we can reply to you)"
              type="email"
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
              disabled={!newQuestion.trim() || !authorName.trim() || !authorEmail.trim() || submitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 disabled:opacity-40 text-slate-900 font-bold py-3 rounded-xl transition-all"
            >
              {submitting ? "Sending..." : "Post Question"}
            </button>
            <p className="text-slate-500 text-xs text-center">Our expert will reply directly to your email within 24 hours. ✈️</p>
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

              {expandedPost === post.id && (
                <div className="border-t border-white/10">
                  {post.replies.length > 0 && (
                    <div className="p-5 space-y-4 border-b border-white/5">
                      {post.replies.map(reply => (
                        <div key={reply.id} className="flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            reply.isExpert ? "bg-amber-500/20 border border-amber-500/40 text-amber-400" : "bg-white/10 text-slate-300"
                          }`}>
                            {reply.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white text-xs font-semibold">{reply.author}</span>
                              {reply.isExpert && (
                                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">✈ Expert</span>
                              )}
                              <span className="text-slate-500 text-xs">{reply.timestamp}</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {post.replies.length === 0 && (
                    <div className="p-5 border-b border-white/5">
                      <p className="text-slate-500 text-sm italic">No answers yet — our expert will respond within 24 hours. ✈️</p>
                    </div>
                  )}

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