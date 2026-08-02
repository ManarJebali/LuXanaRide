interface MediaPlaceholderProps {
  label: string;
  aspect?: string;
  className?: string;
  variant?: "dark" | "light";
}

export default function MediaPlaceholder({
  label,
  aspect = "aspect-[4/3]",
  className = "",
  variant = "dark",
}: MediaPlaceholderProps) {
  const bg =
    variant === "dark"
      ? "bg-gradient-to-br from-brand-steel via-brand-charcoal to-brand-ink"
      : "bg-gradient-to-br from-brand-fog/40 via-brand-paper to-brand-fog/20";
  const textColor = variant === "dark" ? "text-brand-mist" : "text-brand-charcoal/50";
  const borderColor = variant === "dark" ? "border-brand-line" : "border-black/10";

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden border ${borderColor} ${bg} ${aspect} ${className}`}
    >
      <div className="absolute inset-0 flex items-end p-4">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.18em] ${textColor}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
