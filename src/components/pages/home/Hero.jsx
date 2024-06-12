import { Link } from "react-router-dom";
import "./hero.css"; // Archivo CSS para estilos específicos

export const Hero = () => {
  return (
    <div className="hero-container">
      <img src="/banner-cactivas.webp" alt="Cactivas Banner" className="hero-banner" />
      <div className="hero-info-container">
        <h1>Cactivas</h1>
        <p>
          Somos un vivero virtual especializado en cactus y suculentas. Contamos con más de 6 años de historias compartidas. Anteriormente nos encontrabas en Córdoba capital, en la calle 27 de abril.
        </p>
        <p>
          Quienes nos visitaron fueron testigos de charlas gratis, cursos, talleres, expos, sorteos y todo tipo de actividades.
        </p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/cactivas-ecommerce.appspot.com/o/charla.jpg?alt=media&token=4bbce987-1a47-4a19-9979-7b298a3ee851"
          alt="Charlas en Cactivas"
          className="hero-image"
        />
        <div className="cta-container">
          <Link to="/shop" className="cta-button">
            Comprar Ahora
          </Link>
        </div>
      </div>
    </div>
  );
};
