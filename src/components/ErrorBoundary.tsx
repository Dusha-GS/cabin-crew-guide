import { Component, ErrorInfo, ReactNode } from "react";
import { reportError } from "../lib/monitoring";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

/**
 * Without this, a single render-time exception anywhere in the tree gives the
 * user a blank white page — they refresh, see nothing, and leave. This catches
 * it, reports it to Sentry, and shows them a way out.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportError(error, { componentStack: info.componentStack });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">✈️</div>
          <h1 className="text-white font-bold text-xl mb-2">Something went wrong</h1>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Sorry — this page hit an unexpected error. We've been notified automatically.
            Reloading usually fixes it.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold py-2.5 rounded-xl text-sm hover:from-amber-400 transition-all"
            >
              Reload the page
            </button>
            <a
              href="/"
              className="px-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl text-sm hover:bg-white/10 transition-all"
            >
              Go home
            </a>
          </div>
          <p className="text-slate-400 text-xs mt-5">
            Still stuck? Email{" "}
            <a href="mailto:support@cabincrewguidebook.com" className="text-slate-400 underline hover:text-slate-400">
              support@cabincrewguidebook.com
            </a>
          </p>
        </div>
      </div>
    );
  }
}
