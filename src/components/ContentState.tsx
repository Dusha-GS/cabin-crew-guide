import BackButton from "./BackButton";

interface StateProps {
  goBack: () => void;
  previousLabel: string;
}

/** Shown while paid content is being fetched from the server. */
export function ContentLoading({ goBack, previousLabel }: StateProps) {
  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-5xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <div className="w-10 h-10 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading your content…</p>
        </div>
      </div>
    </div>
  );
}

/** Shown when paid content can't be released (not signed in, wrong tier, network). */
export function ContentError({
  goBack,
  previousLabel,
  message,
  onRetry,
}: StateProps & { message: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-5xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="max-w-lg mx-auto mt-16 bg-white/5 border border-amber-500/30 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-white font-bold text-xl mb-2">Content unavailable</h3>
          <p className="text-slate-400 text-sm mb-6">{message}</p>
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-bold px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
