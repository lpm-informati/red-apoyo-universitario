const VARIANTES = {
  primary: "bg-brand text-white hover:bg-brand-deep",
  ghost: "bg-transparent text-ink border border-stone-300 hover:border-brand",
  danger: "bg-alert text-white hover:opacity-90",
  link: "bg-transparent text-brand hover:underline p-0 font-medium",
};

export default function Button({ variant = "primary", small = false, className = "", children, ...rest }) {
  const base = variant === "link" ? "" : `rounded-md font-medium transition-colors ${small ? "px-3 py-1.5 text-sm" : "px-4 py-2"}`;
  return (
    <button className={`${base} ${VARIANTES[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} {...rest}>
      {children}
    </button>
  );
}
