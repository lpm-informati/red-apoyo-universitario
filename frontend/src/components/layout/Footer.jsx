export default function Footer({
  institucion = "Red de Apoyo y Salud Mental Universitaria",
  nota = "Información confidencial. El uso de este panel queda registrado en la bitácora institucional.",
}) {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-300 bg-surface px-4 py-5 text-sm text-ink-soft sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {anioActual} {institucion} · Unidad de Bienestar Estudiantil
        </p>
        <p className="text-xs">🔒 {nota}</p>
      </div>
    </footer>
  );
}
