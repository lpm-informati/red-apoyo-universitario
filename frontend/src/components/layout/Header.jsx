import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ETIQUETAS_ROL } from "../../data/mockData.js";

export default function Header({ usuario, navItems, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-300 bg-surface">
      <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 font-display text-lg text-brand-deep">
          <span className="text-clay">◆</span>
          <span className="hidden sm:inline">Red de Apoyo y Salud Mental</span>
          <span className="sm:hidden">Bienestar</span>
        </div>

        {/* Navegación en escritorio */}
        <nav className="ml-4 hidden flex-1 items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.ruta}
              to={`/${item.ruta}`}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-brand text-white" : "text-ink-soft hover:bg-sage-soft hover:text-brand-deep"
                }`
              }
            >
              {item.etiqueta}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <div className="text-right text-sm">
            <p className="font-medium text-ink">{usuario.nombre}</p>
            <p className="text-xs text-ink-soft">{ETIQUETAS_ROL[usuario.rol] || usuario.rol}</p>
          </div>
          <button onClick={onLogout} className="rounded-md border border-stone-300 px-3 py-1.5 text-sm hover:border-brand">
            Salir
          </button>
        </div>

        {/* Botón hamburguesa en móvil */}
        <button
          className="ml-auto text-xl text-ink md:hidden"
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto((v) => !v)}
        >
          ☰
        </button>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <nav className="flex flex-col gap-1 border-t border-stone-200 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.ruta}
              to={`/${item.ruta}`}
              onClick={() => setMenuAbierto(false)}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-left text-sm font-medium ${
                  isActive ? "bg-brand text-white" : "text-ink-soft hover:bg-sage-soft"
                }`
              }
            >
              {item.etiqueta}
            </NavLink>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-stone-200 pt-3">
            <div className="text-sm">
              <p className="font-medium">{usuario.nombre}</p>
              <p className="text-xs text-ink-soft">{ETIQUETAS_ROL[usuario.rol] || usuario.rol}</p>
            </div>
            <button onClick={onLogout} className="rounded-md border border-stone-300 px-3 py-1.5 text-sm">
              Salir
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}