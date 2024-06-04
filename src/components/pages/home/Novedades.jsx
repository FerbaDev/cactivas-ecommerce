
import { Link } from "react-router-dom";

export const Novedades = () => {
  return (
    <div className="novedades-container">
      <h2>Novedades</h2>
      <h4>¡Bienvenidos a la sección de novedades!</h4>
      <p>
      Aquí encontrarás las últimas incorporaciones y actualizaciones de nuestro vivero. 
      </p>
      <p>Nos enorgullece presentar nuevas especies de cactus y suculentas, productos exclusivos y las tendencias más recientes en jardinería.</p>
      <p><span style={{fontWeight: "bold"}}>Mantente al día con nuestros lanzamientos, ofertas especiales y eventos próximos.</span> Estamos constantemente ampliando nuestro catálogo para ofrecerte lo mejor y más novedoso en el mundo de las plantas.</p>
      <p>No te pierdas las oportunidades únicas que tenemos para vos. ¡Explorá nuestras novedades y dale un toque fresco y verde a tu espacio!</p>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/cactivas-ecommerce.appspot.com/o/pizarra.jpg?alt=media&token=acba84f5-e97a-4771-9e61-0165c6251ddc"
        alt=""
        style={{ width: "100%", height: "auto", padding: "20px", backgroundColor: "#212121" }}
      />
      <Link to={"/shop"} className="btn">Ver tienda</Link>
    </div>
  );
};
