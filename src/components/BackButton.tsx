interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = "Back" }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-all duration-200 mb-6"
    >
      <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-200">
        <svg
          className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
