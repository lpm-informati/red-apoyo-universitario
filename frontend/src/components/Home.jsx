import { useNavigate } from "react-router-dom";
import heroHome from "../assets/hero-home.jpg";
import "./Home.css";

const VALORES = [
  { icono: "☺", titulo: "Equilibrio emocional", texto: "Orientación para cuidar tu bienestar día a día." },
  { icono: "♡", titulo: "Conexión y apoyo", texto: "Un equipo profesional que te escucha y acompaña." },
  { icono: "❀", titulo: "Crecimiento personal", texto: "Talleres y seguimiento para avanzar a tu ritmo." },
];

export default function Home() {
  const navigate = useNavigate();
  const irAlLogin = () => navigate("/login");

  return (
    <div className="home">
      <header className="home-nav">
        <div className="home-brand">
          <span>◆</span>
          <span className="home-brand-long">Red de Apoyo y Salud Mental</span>
        </div>
        <button className="home-btn home-btn--outline" onClick={irAlLogin}>
          Iniciar sesión
        </button>
      </header>

      <main className="home-hero">
        <section>
          <p className="home-eyebrow">Bienestar Estudiantil</p>
          <h1 className="home-title">
            Tu bienestar importa. <em>Aquí hay una red</em> que te acompaña.
          </h1>
          <p className="home-lead">
            Un espacio para acompañar a las y los estudiantes cuando más lo necesitan: solicita apoyo, agenda
            tu atención y participa en talleres, todo con tu cuenta institucional.
          </p>
          <div className="home-cta">
            <button className="home-btn home-btn--lg" onClick={irAlLogin}>
              Iniciar sesión →
            </button>
            <span className="home-note">Con tu correo institucional</span>
          </div>
        </section>

        <div className="home-visual">
          <img
            className="home-img"
            src={heroHome}
            alt="Espacio de bienestar universitario con estudiantes leyendo, conversando y meditando"
          />
        </div>
      </main>

      <section className="home-values">
        <div className="home-values-inner">
          {VALORES.map((v) => (
            <div className="home-value" key={v.titulo}>
              <span className="home-value-ico">{v.icono}</span>
              <div>
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">© {new Date().getFullYear()} Red de Apoyo y Salud Mental Universitaria · Unidad de Bienestar Estudiantil</footer>
    </div>
  );
}
