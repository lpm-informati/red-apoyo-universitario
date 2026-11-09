export default function FormField({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
      <span>{label}</span>
      {children}
    </label>
  );
}

const CONTROL_CLASS =
  "rounded-md border border-stone-300 bg-surface px-3 py-2 text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

export function Input(props) {
  return <input className={CONTROL_CLASS} {...props} />;
}

export function Select({ children, ...props }) {
  return (
    <select className={CONTROL_CLASS} {...props}>
      {children}
    </select>
  );
}

export function Textarea(props) {
  return <textarea className={CONTROL_CLASS} {...props} />;
}

export function ErrorList({ errores }) {
  if (!errores || !errores.length) return null;
  return (
    <ul className="list-disc rounded-md bg-alert-soft px-5 py-2 text-sm text-alert">
      {errores.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  );
}
